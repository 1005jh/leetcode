const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "breadcrumbs",
});

connection.connect();

app.get("/page/:id", (req, res) => {
  const pageId = parseInt(req.params.id);

  const query = `
      SELECT 
        p1.id AS pageId, p1.title AS title, p1.content AS content, p1.path AS pagePath,
        p2.id AS subPageId, p2.title AS subPageTitle
      FROM 
        pages p1
      LEFT JOIN 
        pages p2 ON p1.id = p2.parentId
      WHERE 
        p1.id = ?
    `;

  connection.query(query, [pageId], (error, results) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Page not found" });
    }

    const { pageId, title, content, pagePath } = results[0];
    const subPages = results
      .map((item) => ({
        subPageId: item.subPageId,
        title: item.subPageTitle,
      }))
      .filter((subPage) => subPage.subPageId !== null);

    const pathQuery = `SELECT title FROM pages WHERE id IN (?)`;
    // console.log(typeof pagePath, "ㅁㄴㅇㄹ");
    // console.log(pagePath, "ㅁㄴㅇㄹ");

    connection.query(pathQuery, [pagePath], (error, pathResults) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const breadcrumbs = pathResults.map((item) => item.title);

      const response = {
        pageId,
        title: title,
        content: content,
        subPages,
        breadcrumbs,
      };

      res.status(200).json(response);
    });
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

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
