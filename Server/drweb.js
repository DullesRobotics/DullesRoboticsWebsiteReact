const express = require('express');
const bodyParser = require('body-parser');
var posts = require('./posts.json');
const cors = require('cors');
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const token = require("./token.json")
const fs = require("fs");
const mysql = require('mysql2');
var http = require('https');
var url = require('url');
var remote = require('remote-file-size')
const { Headers } = require('node-fetch');
const { resolve } = require('path');

const app = express();
const port = process.env.PORT || 6937;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ['https://www.dullesrobotics.com', 'https://dev.dullesrobotics.com', 'https://dullesrobotics.com'], credentials: true }));

let team = "frc7494", emailRegx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let tbaCache = [];
let tbaSeasonCache = null, lastTBASeasonCacheRefresh = 0;
let toaCache = {};
let instaCache = [], lastInstaCacheRefresh = 0;
let lastPostRefresh = posts.lastUpdated ? posts.lastUpdated : 0, postData = posts.postData

const mailIPSends = []

const uriPrefix = "/v1"

const transporter = nodemailer.createTransport({
  pool: true,
  host: token.email.host,
  port: token.email.port,
  secure: true, // use TLS
  auth: {
    user: token.email.user,
    pass: token.email.pass
  }
});

const pool = mysql.createPool(token.mysql_auth);

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//dayTimer();

app.get("/storage/:name", (req, res) => {
  const fileName = token.fileLocations.storage_server + req.params.name
  res.sendFile(fileName, (e) => {
    if (e) {
      res.status(400).send({ error: "Error sending file." })
      console.error(`error sending file: ${fileName}`, e)
    }
    else {
      console.log(`sent file: ${fileName}`)
    }
  });
});

app.get(uriPrefix + '/ping', (req, res) => {
  res.send({ response: 'pong' });
});

app.post(uriPrefix + "/resource/add", (req, res) => {
  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.url || !req.body.title)
    return res.status(400).send({ error: "Missing parameters (1)" })

  if (req.body.group && req.body.group.length > 32)
    return res.status(400).send({ error: "Group size is too large. Max characters is 32" })

  if (req.body.description && req.body.description.length > 256)
    return res.status(400).send({ error: "Description size is too large. Max characters is 256" })

  if (req.body.title.length > 64)
    return res.status(400).send({ error: "Title size is too large. Max characters is 64" })

  const title = req.body.title, url = req.body.url, desc = req.body.description, group = req.body.group
  remote(url, function (err, o) {
    if (err) return res.status(500).send({ error: err })

    o /= 1000 //convert to kb

    if (Number(o) > 20000)
      return res.status(400).send({ error: "Those files are too large. 20 MB max for documents. Any larger requires a discussion." })

    download_file_httpget(url).then((fileInfo) => {
      const fileName = fileInfo.name
      pool.query("INSERT INTO `dullesrobo`.`resources` (`file`, `title`, `description`, `timestamp`, `file_size_kb`, `group`) VALUES (?, ?, ?, ?, ?, ?)",
        [fileName, title, desc, new Date().getTime(), o, group], (err, rows) => {
          if (err)
            return res.status(400).send({ error: "An error occurred updating the database: " + err })
          else {
            return res.status(200).send({ success: true, response: "Voila, it's been uploaded.", file: { name: fileName, size: o } })
          }
        })
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
  })
})

/*
 * MEDIA TYPES -
  * 0 - Server Image
  * 1 - Embedded Image/Video
 */
app.post(uriPrefix + "/media/add", (req, res) => {
  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.url || req.body.url.length > 256 || req.body.type === null || req.body.type > 1)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.description && req.body.description.length > 1024)
    return res.status(400).send({ error: "Description size is too large. Max characters is 1024" })

  if (req.body.title && req.body.title.length > 64)
    return res.status(400).send({ error: "Title size is too large. Max characters is 64" })

  if (req.body.date && req.body.date.length > 45)
    return res.status(400).send({ error: "Date size is too large. Max characters is 45" })

  if (req.body.folder && req.body.folder > 99999)
    return res.status(400).send({ error: "Folder id is too big. Make sure it exists. If it's the year 2099 and somehow y'all have over 99999 folders, update this on my grave :>." })

  const title = req.body.title, url = req.body.url, desc = req.body.description, folder = req.body.folder, type = req.body.type, date = req.body.date

  function updateDB(url, title, desc, folder, type, date) {
    pool.query("INSERT INTO `dullesrobo`.`media_files` (`url`, `title`, `description`, `timestamp`, `group`, `date`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [url, title, desc, new Date().getTime(), folder, date, type], (err, rows) => {
        if (err)
          return res.status(400).send({ error: "An error occurred updating the database: " + err })
        else {
          return res.status(200).send({ success: true, response: "Voila, it's been uploaded.", file: { name: url } })
        }
      })
  }

  if (Number(type) === 0) {
    download_file_httpget(url).then((fileInfo) => {
      const fileName = fileInfo.name
      updateDB(fileName, title, desc, folder, type, date);
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
  } else if (Number(type) === 1) {
    updateDB(url, title, desc, folder, type, date);
  } else res.status(400).send({ error: "Invalid media type" })

})

app.post(uriPrefix + "/media_folder/add", (req, res) => {
  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.title)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.title.length > 90)
    return res.status(400).send({ error: "Title size is too large. Max characters is 90" })

  pool.query("INSERT INTO `dullesrobo`.`media_folders` (`title`) VALUES (?)",
    [req.body.title], (err, rows) => {
      if (err)
        return res.status(400).send({ error: "An error occurred updating the database: " + err })
      else {
        return res.status(200).send({ success: true, response: "Voila, it's been added." })
      }
    })
})

app.get(uriPrefix + "/media_folder/list", (req, res) => {
  pool.query(`SELECT * FROM dullesrobo.media_folders`, [], (err, rows) => {
    if (err) return res.status(500).send({ error: "Error retrieving media folders: " + err })
    else return res.status(200).send({ media_folders: rows })
  })
})

app.get(uriPrefix + "/resource/list", (req, res) => {
  pool.query(`SELECT * FROM dullesrobo.resources ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) return res.status(500).send({ error: "Error retrieving resources: " + err })
    else return res.status(200).send({ resources: rows })
  })
})

app.get(uriPrefix + "/media/list", (req, res) => {
  pool.query(`SELECT * FROM dullesrobo.media_files ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) return res.status(500).send({ error: "Error retrieving media: " + err })
    else return res.status(200).send({ media: rows })
  })
})

app.get(uriPrefix + "/media/get/blob", (req, res) => {
  if (!req.query.file) return res.status(400).send({ error: "Missing or invalid file identifier parameter" })
  res.sendFile(`${token.fileLocations.storage_server}${req.query.file}`);
})

app.get(uriPrefix + "/media/get", (req, res) => {

  if (!req.query.url && !req.query.id) return res.status(400).send({ error: "Missing or invalid file identifier parameter" })

  const isFile = req.query.url

  if (isFile) {
    if (req.query.url.length > 64)
      return res.status(400).send({ error: "Invalid file parameter" })

    pool.query(`SELECT * FROM dullesrobo.media_files WHERE url = ?`, [req.query.url], (err, rows) => {
      if (err || rows.length < 1) return res.status(500).send({ error: "Error retrieving resource." })
      if (rows.length < 1) return res.status(400).send({ error: "Resource not found." })
      else return res.status(200).send({ resource: rows })
    })
  } else {
    if (isNaN(req.query.id))
      return res.status(400).send({ error: "Invalid id parameter" })

    pool.query(`SELECT * FROM dullesrobo.media_files WHERE id = ?`, [req.query.id], (err, rows) => {
      if (err) return res.status(500).send({ error: "Error retrieving resource." })
      if (rows.length < 1) return res.status(400).send({ error: "Resource not found." })
      else return res.status(200).send({ resource: rows })
    })
  }
})

app.get(uriPrefix + "/resource/get", (req, res) => {

  if (!req.query.file && !req.query.id) return res.status(400).send({ error: "Missing or invalid file identifier parameter" })

  const isFile = req.query.file

  if (isFile) {
    if (req.query.file.length > 64)
      return res.status(400).send({ error: "Invalid file parameter" })

    pool.query(`SELECT * FROM dullesrobo.resources WHERE file = ?`, [req.query.file], (err, rows) => {
      if (err || rows.length < 1) return res.status(500).send({ error: "Error retrieving resource." })
      if (rows.length < 1) return res.status(400).send({ error: "Resource not found." })
      else return res.status(200).send({ resource: rows })
    })
  } else {
    if (isNaN(req.query.id))
      return res.status(400).send({ error: "Invalid id parameter" })

    pool.query(`SELECT * FROM dullesrobo.resources WHERE id = ?`, [req.query.id], (err, rows) => {
      if (err) return res.status(500).send({ error: "Error retrieving resource." })
      if (rows.length < 1) return res.status(400).send({ error: "Resource not found." })
      else return res.status(200).send({ resource: rows })
    })
  }
})

app.post(uriPrefix + "/media_folder/edit", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.id && !req.body.title)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.title > 90)
    return res.status(400).send({ error: "Title should be <90 chararcters." })

  const title = req.body.title, id = req.body.id

  pool.query(`UPDATE \`dullesrobo\`.\`media_folders\` SET \`title\` = ? WHERE (\`id\` = ?)`, [title, id], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database: " + err })
    else {
      return res.status(200).send(({ success: true, response: "Edited metadata. If that ID is valid, it'll reflect soon." }))
    }
  })
})

app.post(uriPrefix + "/resource/edit", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.file)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.file.length > 64)
    return res.status(400).send({ error: "Invalid parameters" })

  if (req.body.description && req.body.description.length > 256)
    return res.status(400).send({ error: "Description size is too large. Max characters is 256" })

  if (req.body.title && req.body.title.length > 64)
    return res.status(400).send({ error: "Title size is too large. Max characters is 64" })

  const title = req.body.title, desc = req.body.description
  const args = [new Date().getTime()]
  if (desc) args.push(desc)
  if (title) args.push(title)
  args.push(req.body.file)

  pool.query(`UPDATE \`dullesrobo\`.\`resources\` SET \`timestamp\` = ? ${desc ? `, \`description\` = ?` : ``}${title ? `, \`title\` = ?` : ``} WHERE \`file\` = ?`, args, (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database: " + err })
    else {
      updatePostFile(true)
      return res.status(200).send(({ success: true, response: "Edited metadata. If that ID is valid, it'll reflect soon." }))
    }
  })
})

app.post(uriPrefix + "/media_folder/delete", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.id) return res.status(400).send({ error: "Missing or invalid folder id" })

  pool.query("DELETE FROM `dullesrobo`.`media_folders` WHERE `id` = ?", [req.body.id], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      if (rows.affectedRows === 0)
        return res.status(400).send({ error: "That folder doesn't exist." })
      else
        return res.status(200).send({ success: true, response: "The folder was deleted from the database. All associated media should be re-assigned to not be lost." })
    }
  })
})

app.post(uriPrefix + "/media/delete", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.file) return res.status(400).send({ error: "Missing or invalid file" })

  pool.query("DELETE FROM `dullesrobo`.`media_files` WHERE `url` = ?", [req.body.file], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      if (rows.affectedRows === 0)
        return res.status(400).send({ error: "That file doesn't exist." })
      console.log(rows)
      if (String(req.body.file).indexOf("http") == -1) {
        fs.unlink(`${token.fileLocations.storage_server}${req.body.file}`, function (err) {
          if (err) {
            console.log(`File ${req.body.file} is a waste file!`);
            rows.
              res.status(500).send({ error: "File deleted from database but NOT storage!!" })
          } else {
            console.log(`File ${req.body.file} deleted!`);
            return res.status(200).send({ success: true, response: "The file, if it was valid, was deleted from both the database and storage." })
          }

          // if no error, file has been deleted successfully
        });
      } else {
        return res.status(200).send({ success: true, response: "The file, if it was valid, was deleted from both the database." })
      }
    }
  })
})

app.post(uriPrefix + "/resource/delete", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.file || req.body.file.length > 64) return res.status(400).send({ error: "Missing or invalid file parameter" })

  pool.query("DELETE FROM `dullesrobo`.`resources` WHERE `file` = ?", [req.body.file], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      if (rows.affectedRows === 0)
        return res.status(400).send({ error: "That file doesn't exist." })
      fs.unlink(`${token.fileLocations.storage_server}${req.body.file}`, function (err) {
        if (err) {
          console.log(`File ${req.body.file} is a waste file!`);
          res.status(500).send({ error: "File deleted from database but NOT storage!!" })
        } else {
          console.log(`File ${req.body.file} deleted!`);
          return res.status(200).send({ success: true, response: "The file, if it was valid, was deleted from both the database and storage." })
        }

        // if no error, file has been deleted successfully
      });
    }
  })
})

app.get(uriPrefix + '/posts', (req, res) => {
  if (!req.query.i) {
    res.status(400).send({ error: "Missing param i" })
    return;
  }
  const startIndex = req.query.i, max = req.query.max && req.query.max <= 4 ? req.query.max : 4;
  if (isNaN(startIndex) || startIndex < 0) {
    res.status(400).send({ error: "param i is not a number" });
    return;
  }

  updatePostFile()

  const bundle = [];
  if (postData.length > startIndex)
    for (let i = startIndex; i < postData.length && i < Number(startIndex) + Number(max); i++) {
      let temp = postData[i];
      if (Number(i) > 0) temp["nextID"] = postData[Number(i) - 1].id;
      if (Number(i) < postData.length - 1) temp["prevID"] = postData[Number(i) + 1].id;
      bundle.push(temp);
    }
  res.status(200).send({ posts: bundle });
});

app.get(uriPrefix + '/post', (req, res) => {
  if (!req.query.id || String(req.query.id).length !== 8) {
    res.status(400).send({ error: "Missing or incorrect param id" })
    return;
  }
  console.log("getting a request for id " + req.query.id);

  updatePostFile()

  let post = {};
  for (let i in postData) {
    if (postData[i].id === req.query.id) {
      let temp = postData[i];
      if (Number(i) > 0) temp["nextID"] = postData[Number(i) - 1].id;
      if (Number(i) < postData.length - 1) temp["prevID"] = postData[Number(i) + 1].id;
      post = temp;
      break;
    }
  }
  res.status(200).send(post)
});

app.post(uriPrefix + "/post/add", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.title || !req.body.category || !req.body.content)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.title.length > 128 || req.body.title.length === 0)
    return res.status(400).send({ error: "Title parameter too big/small" })

  if (req.body.category.length > 45 || req.body.category.length === 0)
    return res.status(400).send({ error: "Category parameter too big/small" })

  if (req.body.content.length > 4000 || req.body.content.length === 0)
    return res.status(400).send({ error: "Content parameter too big/small" })

  pool.query("INSERT INTO `dullesrobo`.`posts` (`id`, `title`, `category`, `timestamp`, `content`) VALUES (?, ?, ?, ?, ?)", [generate(8), req.body.title, req.body.category, new Date().getTime(), req.body.content], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      updatePostFile(true)
      return res.status(200).send(({ success: true, response: "Added. It'll be on the website soon." }))
    }
  })
})


app.post(uriPrefix + "/post/refresh", (req, res) => {

  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  updatePostFile(true)
  res.status(200).send({ success: true })
})

app.post(uriPrefix + "/post/edit", (req, res) => {
  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.id || !req.body.title || !req.body.category || !req.body.content)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.id.length > 8 || req.body.id.length === 0)
    return res.status(400).send({ error: "ID parameter too big/small" })

  if (req.body.title.length > 128 || req.body.title.length === 0)
    return res.status(400).send({ error: "Title parameter too big/small" })

  if (req.body.category.length > 45 || req.body.category.length === 0)
    return res.status(400).send({ error: "Category parameter too big/small" })

  if (req.body.content.length > 4000 || req.body.content.length === 0)
    return res.status(400).send({ error: "Content parameter too big/small" })

  pool.query("UPDATE `dullesrobo`.`posts` SET `title` = ?, `category` = ?, `content` = ? WHERE (`id` = ?)", [req.body.title, req.body.category, req.body.content, req.body.id], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      updatePostFile(true)
      return res.status(200).send(({ success: true, response: "Edited. If that ID is valid, it'll reflect on the website soon." }))
    }
  })
})

app.post(uriPrefix + "/post/delete", (req, res) => {
  if (!req.body.token || req.body.token !== token.editToken)
    return res.status(400).send({ error: "Missing token" })

  if (!req.body.id)
    return res.status(400).send({ error: "Missing parameters" })

  if (req.body.id.length > 8 || req.body.id.length === 0)
    return res.status(400).send({ error: "ID parameter too big/small" })

  pool.query("DELETE FROM `dullesrobo`.`posts` WHERE (`id` = ?)", [req.body.id], (err, rows) => {
    if (err)
      return res.status(400).send({ error: "An error occurred updating the database." })
    else {
      updatePostFile(true)
      return res.status(200).send(({ success: true, response: "Deleted. If that ID is valid, it'll reflect on the website soon." }))
    }
  })

})

function updatePostFile(force) {
  console.log(force ? "Forced" : "Not forced")
  console.log(lastPostRefresh)
  console.log(lastPostRefresh + 3600000)
  console.log(lastPostRefresh + 3600000 < new Date().getTime())
  if (force || lastPostRefresh + 3600000 < new Date().getTime())
    pool.query(`SELECT * FROM dullesrobo.posts ORDER BY timestamp DESC`, [], (err, rows) => {
      if (err || rows.length < 1) return res.status(500).send({ error: "Error retrieving post." })
      if (rows[0].order) {
        console.log("writing...")

        const JSONToWrite = {
          "postData": rows,
          "lastUpdated": new Date().getTime()
        }
        postData = rows
        lastPostRefresh = new Date().getTime()

        fs.writeFileSync(token.fileLocations.post, JSON.stringify(JSONToWrite), (e) => { console.log(e); res.status(400).send({ error: "Error retrieving post." }) });
      }
    })
}

app.post(uriPrefix + "/contact", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("Contact Form POST request recieved from IP: " + ip);
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send({ error: "Sorry, an issue occurred. Try emailing us instead at dullesrobotics@gmail.com. (1)" })
    return;
  }
  if (!req.body.name || !req.body.email || req.body.phone === null || !req.body.subject || !req.body.message) {
    res.status(400).send({ error: "Sorry, an issue occurred. Try emailing us instead at dullesrobotics@gmail.com. (2)" })
    return;
  }
  if (!emailRegx.test(req.body.email.toLowerCase())) {
    res.status(400).send({ error: "Sorry, the provided email was invalid. Try emailing us instead. (dullesrobotics@gmail.com)" })
    return;
  }

  let ipIndex = mailIPSends.map(m => m.ip).indexOf(ip);
  if (ipIndex > -1) {
    if (new Date().getTime() - mailIPSends[ipIndex].time < 1800000) {
      res.status(400).send({ error: "You can only send one message via the web form every 30 minutes. Try emailing us instead. (dullesrobotics@gmail.com)" })
      return;
    }
  }

  var htmlStream = {
    from: `${req.body.name} <contactform@dullesrobotics.com>`,
    to: "Dulles Robotics <dullesrobotics@gmail.com>",
    replyTo: req.body.email,
    subject: req.body.subject,
    text: `This is a message sent via the Dulles Robotics website's contact form: \n\nName: ${req.body.name} \nEmail: ${req.body.email} \nPhone Number: ${req.body.phone ? req.body.phone : "N/A"} \nSubject: ${req.body.subject} \nMessage:\n\n${req.body.message}`,
  };

  if (ipIndex > -1)
    mailIPSends[ipIndex] = { ip: ip, time: new Date().getTime() }
  else
    mailIPSends.push({ ip: ip, time: new Date().getTime() });

  transporter.sendMail(htmlStream, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Sorry, an issue occurred. Try emailing us instead at dullesrobotics@gmail.com. (0)" })
      transporter.close();
    } else {
      res.status(200).send({ response: "Message Sent" })
    }
  });
})

app.get(uriPrefix + "/tba/season", (req, res) => {
  getMaxTOASeason().then(maxSeason => {
    if (!maxSeason) res.status(200).send({ "max_season": new Date().getFullYear(), "error": true })
    else return res.status(200).send(maxSeason);
  });
});

app.get(uriPrefix + '/toa', (req, res) => {

  const year = req.query.year;
  if (!req.query.year) {
    res.status(400).send({ error: "Missing param year" })
    return;
  }

  queryTOA(year).then(json => {
    res.send(json)
  })

})

async function queryTOA(year) {
  return new Promise((resolve, reject) => {

    let team = 12456

    if (
      toaCache[year] &&
      toaCache[year]["updated"] &&
      new Date().getTime() - toaCache[year]["updated"] < 10000000)
      return resolve({ "comps": toaCache[year], from_cache: true });


    fetch(`https://www.theorangealliance.org/api/team/${team}/events/${year}`,
      {
        headers: new Headers({
          "X-Application-Origin": "dullesroboticswebsite",
          "X-TOA-Key": token.toa_key,
          "Content-Type": "application/json"
        })
      })
      .then(res => res.json())
      .then(json => {
        if (!json || json["_code"])
          resolve({ response: "error", error: true })

        let payload = [];
        for (let eventID in json) {

          const event = json[eventID]
          const eventKey = event.event_key
          fetch(`https://www.theorangealliance.org/api/event/${eventKey}`,
            {
              headers: new Headers({
                "X-Application-Origin": "dullesroboticswebsite",
                "X-TOA-Key": token.toa_key,
                "Content-Type": "application/json"
              })
            })
            .then(res => res.json())
            .then(json2 => {
              fetch(`https://www.theorangealliance.org/api/event/${eventKey}/rankings`,
                {
                  headers: new Headers({
                    "X-Application-Origin": "dullesroboticswebsite",
                    "X-TOA-Key": token.toa_key,
                    "Content-Type": "application/json"
                  })
                })
                .then(res => res.json())
                .then(json3 => {
                  fetch(`https://www.theorangealliance.org/api/event/${eventKey}/awards`,
                    {
                      headers: new Headers({
                        "X-Application-Origin": "dullesroboticswebsite",
                        "X-TOA-Key": token.toa_key,
                        "Content-Type": "application/json"
                      })
                    })
                    .then(res => res.json())
                    .then(json4 => {
                      if (!json2 || json2["_code"] || !json3 || json3["_code"])
                        payload.push({ "name": "error" })
                      else {
                        json13822Results = Object.values(json3).filter(j => j.team_key == "13822")
                        json12456Results = Object.values(json3).filter(j => j.team_key == "12456")

                        let awards13822 = [], awards12456 = [];
                        if (json4 && !json4["_code"]) {
                          json13822Awards = Object.values(json4).filter(j => j.team_key == "13822")
                          json12456Awards = Object.values(json4).filter(j => j.team_key == "12456")
                          awards13822 = json13822Awards.map(e => { return { name: e.award_name, award_type: e.award.award_type } })
                          awards12456 = json12456Awards.map(e => { return { name: e.award_name, award_type: e.award.award_type } })
                        }

                        let status = {}
                        if (json12456Results[0]) {
                          status["team12456"] = {
                            "wins": json12456Results[0].wins,
                            "losses": json12456Results[0].losses,
                            "ties": json12456Results[0].ties,
                            "rank": json12456Results[0].rank,
                            "awards": awards12456
                          }
                        }

                        if (json13822Results[0]) {
                          status["team13822"] = {
                            "wins": json13822Results[0].wins,
                            "losses": json13822Results[0].losses,
                            "ties": json13822Results[0].ties,
                            "rank": json13822Results[0].rank,
                            "awards": awards13822
                          }
                        }

                        payload.push({
                          "key": json2[0]["event_key"],
                          "type": "First Tech Challenge",
                          "name": json2[0]["event_name"],
                          "city": json2[0]["city"],
                          "state_prov": json2[0]["state_prov"],
                          "country": json2[0]["country"],
                          "start_date": json2[0]["start_date"] ? json2[0]["start_date"].slice(0, 10) : null,
                          "end_date": json2[0]["end_date"] ? json2[0]["end_date"].slice(0, 10) : null,
                          "event_type_string": json2[0]["event_type_string"],
                          "status": status
                        })
                      }

                      if (payload.length >= json.length) {
                        resolve({ "comps": payload });
                        toaCache[year] = payload;
                        toaCache[year]["updated"] = new Date().getTime();
                        return
                      }
                    });
                })
            })
        }
      })
      .catch(e => reject({ "error": e }))
  })
}

app.get(uriPrefix + '/tba', (req, res) => {
  const year = req.query.year;
  if (!req.query.year) {
    res.status(400).send({ error: "Missing param year" })
    return;
  }

  try {
    for (let n in tbaCache)
      if (tbaCache[n].year && tbaCache[n].year === year)
        if (tbaCache[n].refresh && new Date().getTime() - tbaCache[n].refresh < 10000000) {
          res.status(200).send({ comps: tbaCache[n].comps, district_info: tbaCache[n].district_info, from_cache: true })
          return;
        }

    fetch(`https://www.thebluealliance.com/api/v3/team/${team}/events/${year}?X-TBA-Auth-Key=${token.tba_key}`)
      .then(res => res.json())
      .then(json => {
        if (!json || json["Error"] || json["Errors"]) {
          res.status(500).send({ error: "An error occurred with TBA." });
          return;
        }

        let payload = [];
        for (let c in json)
          payload.push({
            "type": "First Robotics Challenge",
            "key": json[c]["key"],
            "name": json[c]["name"],
            "city": json[c]["city"],
            "state_prov": json[c]["state_prov"],
            "country": json[c]["country"],
            "start_date": json[c]["start_date"],
            "end_date": json[c]["end_date"],
            "event_type_string": json[c]["event_type_string"],
            "status": {
              "wins": null,
              "losses": null,
              "ties": null,
              "rank": null,
              "awards": []
            }
          })

        if (payload.length < 1) {
          res.status(200).send({ comps: [], district_info: {} })
          return;
        }

        fetch(`https://www.thebluealliance.com/api/v3/team/${team}/events/${year}/statuses?X-TBA-Auth-Key=${token.tba_key}`)
          .then(res => res.json())
          .then(json2 => {
            if (!json2 || json2["Error"] || json2["Errors"]) {
              res.status(500).send({ error: "An error occurred with TBA." });
              return;
            }

            const json2Keys = Object.keys(json2);
            for (let c in payload) {
              if (json2Keys.indexOf(payload[c].key) > -1) {
                const entry = json2[json2Keys[json2Keys.indexOf(payload[c].key)]];
                if (entry) {
                  if (entry["qual"] !== null) {
                    payload[c]["status"]["wins"] = (Number(entry["playoff"] ? entry["playoff"]["record"]["wins"] : 0) + Number(entry["qual"]["ranking"]["record"]["wins"]));
                    payload[c]["status"]["losses"] = (Number(entry["playoff"] ? entry["playoff"]["record"]["losses"] : 0) + Number(entry["qual"]["ranking"]["record"]["losses"]));
                    payload[c]["status"]["ties"] = (Number(entry["playoff"] ? entry["playoff"]["record"]["ties"] : 0) + Number(entry["qual"]["ranking"]["record"]["ties"]));
                    payload[c]["status"]["rank"] = (entry["qual"]["ranking"]["rank"]);
                  }
                }
              }
            }

            fetch(`https://www.thebluealliance.com/api/v3/team/${team}/awards/${year}?X-TBA-Auth-Key=${token.tba_key}`)
              .then(res => res.json())
              .then(json3 => {
                if (!json3 || json3["Error"] || json3["Errors"]) {
                  res.status(500).send({ error: "An error occurred with TBA." });
                  return;
                }

                const keyList = payload.map(c => c["key"]);
                for (let c in json3) {
                  const entry = json3[c];
                  const idx = keyList.indexOf(entry["event_key"]);
                  if (idx > -1) {
                    payload[idx]["status"]["awards"].push({
                      "name": entry["name"],
                      "award_type": Number(entry["award_type"])
                    });
                  }
                }

                let district = year + "tx";
                if (payload.length > 0)
                  if (json[0] && json[0]["district"] && json[0]["district"]["key"])
                    district = json[0]["district"]["key"];

                fetch(`https://www.thebluealliance.com/api/v3/district/${district}/rankings?X-TBA-Auth-Key=${token.tba_key}`)
                  .then(res => res.json())
                  .then(json4 => {
                    if (!json4 || json4["Error"] || json4["Errors"]) {
                      res.status(500).send({ error: "An error occurred with TBA." });
                      return;
                    }

                    let entry;
                    for (let n in json4)
                      if (json4[n]["team_key"] === team) {
                        entry = json4[n];
                        break;
                      }

                    const districtInfo = entry ? {
                      "key": district,
                      "rank": entry["rank"],
                      "points": entry["point_total"]
                    } : {};

                    //Sorts by date
                    payload.sort((a, b) => {
                      let aStartDay, aStartMonth, aStartYear, bStartDay, bStartMonth, bStartYear;
                      if (a["start_date"]) {
                        const aStartDate = a["start_date"].split("-");
                        aStartYear = aStartDate[0];
                        aStartMonth = aStartDate[1];
                        aStartDay = aStartDate[2];
                      } else return 1;
                      if (b["start_date"]) {
                        const bStartDate = b["start_date"].split("-");
                        bStartYear = bStartDate[0];
                        bStartMonth = bStartDate[1];
                        bStartDay = bStartDate[2];
                      } else return -1;
                      return Date.UTC(+aStartYear, aStartMonth - 1, aStartDay) - Date.UTC(+bStartYear, bStartMonth - 1, bStartDay);
                    });

                    res.status(200).send({ comps: payload, district_info: districtInfo })

                    const cacheIdx = tbaCache.map(c => c.year).indexOf(year);
                    const cachePayload = { year: year, refresh: new Date().getTime(), comps: payload, district_info: districtInfo };
                    if (cacheIdx > -1)
                      tbaCache[cacheIdx] = cachePayload;
                    else
                      tbaCache.push(cachePayload);

                  }).catch(() => { return res.status(500).send({ error: "An error occurred with TBA." }) });
              }).catch(() => { return res.status(500).send({ error: "An error occurred with TBA." }) });
          }).catch(() => { return res.status(500).send({ error: "An error occurred with TBA." }) });
      }).catch(() => { return res.status(500).send({ error: "An error occurred." }) });
  } catch (err) { return res.status(500).send({ error: "An error occurred." }) }
})

// app.get(uriPrefix + "/instagram", (req, res) => {
//   if (lastInstaCacheRefresh + 86400000 < new Date().getTime()) {
//     fetch(`https://graph.instagram.com/me/media?fields=id,caption&access_token=${token.instagram.token}`)
//       .then(res => res.json())
//       .then(json => {
//         if (!json || !json.data) {
//           lastInstaCacheRefresh = new Date().getTime();
//           return res.status(500).send({ error: "No data was provided by Facebook (Instagram)." });
//         }
//         getInstagramMedia(json.data, 5).then((promiseResponse, promiseRejection) => {
//           if (promiseRejection || !promiseResponse) {
//             lastInstaCacheRefresh = new Date().getTime();
//             return res.status(500).send({ error: "A data processing error has occurred." })
//           }

//           promiseResponse.sort((a, b) => b.timestamp > a.timestamp ? 1 : -1)

//           instaCache = promiseResponse;
//           lastInstaCacheRefresh = new Date().getTime();
//           res.status(200).send({ data: promiseResponse, cached: false });
//         }).catch((err) => {
//           lastInstaCacheRefresh = new Date().getTime();
//           return res.status(500).send({ error: "A data processing error has occurred." })
//         });
//       }).catch((err) => {
//         lastInstaCacheRefresh = new Date().getTime();
//         return res.status(500).send({ error: "An error occurred with Facebook (Instagram).", details: err });
//       });
//   } else res.status(200).send({ data: instaCache, cached: true });
// })

// async function getMaxTBASeason() {
//   return new Promise((resolve, reject) => {
//     if (!tbaSeasonCache || new Date().getTime() - lastTBASeasonCacheRefresh > 500000000) {
//       fetch(`https://www.thebluealliance.com/api/v3/status?X-TBA-Auth-Key=${token.tba_key}`)
//         .then(res => res.json())
//         .then(json => {
//           if (!json || json["Error"] || json["Errors"])
//             reject();
//           if (json["max_season"]) {
//             tbaSeasonCache = json["max_season"];
//             lastTBASeasonCacheRefresh = new Date().getTime();
//             resolve({ "max_season": json["max_season"] });
//           } else reject();
//         }).catch(() => { reject() });
//     } else resolve({ "max_season": tbaSeasonCache, "from_cache": true });
//   })
// }

async function getMaxTOASeason() {
  return new Promise((resolve, reject) => {
    if (!tbaSeasonCache || new Date().getTime() - lastTBASeasonCacheRefresh > 500000000) {
      let year1, year2;
      fetch(`https://www.theorangealliance.org/api/team/12456/`,
        {
          headers: new Headers({
            "X-Application-Origin": "dullesroboticswebsite",
            "X-TOA-Key": token.toa_key,
            "Content-Type": "application/json"
          })
        })
        .then(res => res.json())
        .then(json => {
          if (!json || json["error"] || json["_code"] || json.length < 1) year1 = 0;
          year1 = json[0].last_active;
        }).catch(() => { reject() });


      fetch(`https://www.theorangealliance.org/api/team/13822/`,
        {
          headers: new Headers({
            "X-Application-Origin": "dullesroboticswebsite",
            "X-TOA-Key": token.toa_key,
            "Content-Type": "application/json"
          })
        })
        .then(res => res.json())
        .then(json => {
          if (!json || json["error"] || json["_code"] || json.length < 1) year2 = 0;
          year2 = json[0].last_active;

          let year = Math.max(year1 ? year1 : 0, year2 ? year2 : 0);
          year = year === 0 ? new Date().getFullYear() : year;
          tbaSeasonCache = year;
          lastTBASeasonCacheRefresh = new Date().getTime();

          resolve({ "max_season": year === 0 ? new Date().getFullYear() : year })
        }).catch(() => { reject() });
    } else resolve({ "max_season": tbaSeasonCache, "from_cache": true });
  })
}

// /**
//  * runs a daily loop
//  */
// async function dayTimer() {
//   updateInstagramToken();
//   setInterval(() => {
//     updateInstagramToken();
//   }, 86400000)
// }

// async function getInstagramMedia(dataList, amount) {
//   return new Promise((resolve, reject) => {
//     let finalList = [];
//     for (let i = 0; i < amount && i < dataList.length; i++) {
//       fetch(`https://graph.instagram.com/${dataList[i].id}?fields=id,media_type,media_url,timestamp&access_token=${token.instagram.token}`)
//         .then(res => res.json())
//         .then(json => {
//           if (!json || !json.media_url || !json.media_type)
//             return reject({ error: "Incomplete data was provided by Facebook (Instagram)." })
//           finalList.push({
//             id: dataList[i].id,
//             caption: dataList[i].caption,
//             media_type: json.media_type,
//             media_url: json.media_url,
//             timestamp: json.timestamp
//           })
//           if (i + 1 >= amount || i + 1 >= dataList.length)
//             resolve(finalList);
//         }).catch(() => { return reject({ error: "An error occurred with Instagram's media servers." }) })
//     }
//   })
// }

// async function updateInstagramToken() {
//   return new Promise((resolve, reject) => {
//     if (new Date().getTime() >= token.instagram.time_to_renew) {
//       fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token.instagram.token}`)
//         .then(res => res.json())
//         .then(json => {
//           if (!json || !json.access_token || !json.expires_in) {
//             reject()
//             return
//           }

//           let newToken = json.access_token;
//           console.log("New Token: " + newToken)

//           const fileName = "token.json"
//           let m = JSON.parse(fs.readFileSync(fileName).toString());
//           m.instagram.token = newToken;
//           m.instagram.time_to_renew = new Date().getTime() + (json.expires_in * 1000) - 172800000;
//           fs.writeFile(fileName, JSON.stringify(m), (err) => { if (err) reject(); else resolve(); })
//           console.log("Token applied");

//         }).catch(() => { });
//     } else resolve();
//   })
// }

// Function for downloading file using HTTP.get
async function download_file_httpget(file_url) {
  return new Promise((resolve, reject) => {
    let options = {
      host: url.parse(file_url).host,
      //port: 80,
      path: url.parse(file_url).pathname
    };

    let file_ending = url.parse(file_url).pathname.split('/').pop().split(".").pop();
    let file_name = `${generate(15)}.${file_ending}`
    let file = fs.createWriteStream(token.fileLocations.storage_server + file_name);

    http.get(options, function (res) {
      res.on('error', function (data) {
        reject("error: " + data)
      })

      res.on('data', function (data) {
        file.write(data);
      })

      res.on('end', function () {
        file.end();
        console.log(file_name + ' downloaded to ' + token.fileLocations.storage_server);
        resolve({ name: file_name })
      });
    });
  })
};

/**
 * Generates a random number with the specified amount of symbols.
 * @param {Number} count 
 * @returns {String} id
 */
function generate(count) {
  var _sym = '1234567890aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ-';
  var str = '';
  for (var i = 0; i < count; i++)
    str += _sym[parseInt(Math.random() * (_sym.length))];
  return str;
}

app.listen(port, () => console.log(`Listening on port ${port}`));