// const mysql = require("mysql2");
// const express = require("express");
// const app = express();
// const port = 3000;

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "1234",
//   database: "breadcrumbs",
// });

// connection.connect();

// app.get("/page/:id", (req, res) => {
//   try {
//     const pageId = parseInt(req.params.id);

//     const query = `
//             SELECT
//               p1.id AS id, p1.title AS title, p1.content AS content, p1.path AS pagePath,
//               p2.id AS subPageId, p2.title AS subPageTitle
//             FROM
//               pages p1
//             LEFT JOIN
//               pages p2 ON p1.id = p2.parentId
//             WHERE
//               p1.id = ?
//           `;

//     connection.query(query, [pageId], (error, results) => {
//       if (error) {
//         return res.status(400).json({ error: error.message });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ error: "Page not found" });
//       }
//       console.log(results, "results");
//       /**[
//   {
//     id: 4,
//     title: '부모',
//     content: '모',
//     pagePath: [],
//     subPageId: 7,
//     subPageTitle: '자식1'
//   },
//   {
//     id: 4,
//     title: '부모',
//     content: '모',
//     pagePath: [],
//     subPageId: 13,
//     subPageTitle: '자식11'
//   }
// ]  results 의 값*/
//       const { id, title, content, pagePath } = results[0];
//       const subPages = results
//         .map((item) => ({
//           subPageId: item.subPageId,
//           title: item.subPageTitle,
//         }))
//         .filter((subPage) => subPage.subPageId !== null);

//       const pathQuery = `SELECT title FROM pages WHERE id IN (?)`;
//       // console.log(typeof pagePath, "ㅁㄴㅇㄹ");
//       // console.log(pagePath, "ㅁㄴㅇㄹ");
//       if (pagePath.length === 0) {
//         const response = {
//           pageId: id,
//           title: title,
//           content: content,
//           subPages,
//           breadcrumbs: [],
//         };
//         return res.status(200).json(response);
//       }

//       connection.query(pathQuery, [pagePath], (error, pathResults) => {
//         if (error) {
//           return res.status(400).json({ error: error.message });
//         }
//         console.log(pathResults, "pathResults");
//         /**[ { title: '부모' }, { title: '자식1' }, { title: '자식2' } ] pathResults의 값 */
//         const breadcrumbs = pathResults.map((item) => item.title);

//         const response = {
//           pageId: id,
//           title: title,
//           content: content,
//           subPages,
//           breadcrumbs,
//         };

//         res.status(200).json(response);
//       });
//     });
//   } catch (error) {
//     console.log(error, "error log");
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

/**
 * mysql 로컬 db 접속 후 아래 순서대로 진행
 * *
 * database 만들기
 * create database breadcrumbs 
 * *
 * 테이블 만들기
 * CREATE TABLE pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    parentId INT,
    path JSON,
    FOREIGN KEY (parentId) REFERENCES pages(id)
);
 * *
 * 데이터 넣기
 * -- 최상위 부모 페이지 생성
INSERT INTO pages (title, content, parentId, path) VALUES ('부모', '부모', NULL, '[]');

-- 첫 번째 자식 페이지 생성.
INSERT INTO pages (title, content, parentId, path) VALUES ('자식1', '자식1', 1, '[1]');

-- 두 번째 자식 페이지 생성.
INSERT INTO pages (title, content, parentId, path) VALUES ('자식2', '자식2', 2, '[1,2]');

-- 세 번째 자식 페이지 생성.
INSERT INTO pages (title, content, parentId, path) VALUES ('자식3', '자식3', 3, '[1,2,3]');

 */
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let connection;

async function initialize() {
  connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "breadcrumbs",
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

initialize();

app.get("/page/:id", async (req, res) => {
  try {
    const pageId = parseInt(req.params.id);

    const query = `
      SELECT 
        p1.id AS id, p1.title AS title, p1.content AS content, p1.path AS pagePath,
        p2.id AS subPageId, p2.title AS subPageTitle
      FROM 
        pages p1
      LEFT JOIN 
        pages p2 ON p1.id = p2.parentId
      WHERE 
        p1.id = ?
    `;

    const [results] = await connection.promise().query(query, [pageId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Page not found" });
    }

    const { id, title, content, pagePath } = results[0];

    const subPages = results
      .map((item) => ({
        subPageId: item.subPageId,
        title: item.subPageTitle,
      }))
      .filter((subPage) => subPage.subPageId !== null);

    if (pagePath && pagePath.length === 0) {
      const response = {
        pageId: id,
        title,
        content,
        subPages,
        breadcrumbs: [],
      };
      return res.status(200).json(response);
    }

    const pathQuery = `SELECT title FROM pages WHERE id IN (?)`;
    const [pathResults] = await connection
      .promise()
      .query(pathQuery, [pagePath]);

    const breadcrumbs = pathResults.map((item) => item.title);

    const response = {
      pageId: id,
      title,
      content,
      subPages,
      breadcrumbs,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/page/:id", async (req, res) => {
  try {
    const { parentId } = req.body;
    const pageId = parseInt(req.params.id);
    const [currentPageResults] = await connection
      .promise()
      .query(`SELECT * FROM pages WHERE id = ?`, [pageId]);

    if (currentPageResults.length === 0) {
      return res.status(404).json({ error: "Page not found" });
    }

    const currentParentId = currentPageResults[0].parentId;
    const currentPath = currentPageResults[0].path;

    if (currentParentId === parentId) {
      return res.status(400).json({
        error: "parentId not same currentParentId",
      });
    }

    let newPath = [];
    if (parentId !== null) {
      const [newParentResults] = await connection
        .promise()
        .query(`SELECT * FROM pages WHERE id = ?`, [parentId]);

      if (newParentResults.length === 0) {
        return res.status(404).json({ error: "New parent not found" });
      }
      newPath = [...newParentResults[0].path, parentId];
    }

    await connection
      .promise()
      .query(`UPDATE pages SET parentId = ?, path = ? WHERE id = ?`, [
        parentId,
        JSON.stringify(newPath),
        pageId,
      ]);

    const updateDescendantsPath = async (parentId, parentPath) => {
      const [children] = await connection
        .promise()
        .query(`SELECT * FROM pages WHERE parentId = ?`, [parentId]);

      for (const child of children) {
        const newChildPath = [...parentPath, child.id];
        await connection
          .promise()
          .query(`UPDATE pages SET path = ? WHERE id = ?`, [
            JSON.stringify(newChildPath),
            child.id,
          ]);
        await updateDescendantsPath(child.id, newChildPath);
      }
    };

    await updateDescendantsPath(pageId, newPath);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
