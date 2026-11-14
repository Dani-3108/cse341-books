# Week 02 Spec

## Version 2 (current, use this one)

### Rules that apply to every write route (POST, PUT)
- Errors always use the shape { "message": "..." }. Never return stack
  traces or database errors; log details on the server.
- Validation order: (1) body exists and is not empty, (2) required
  fields present, (3) field types valid, (4) id not in a PUT body,
  (5) authorId exists (books only), (6) resource exists / not duplicate,
  then the database write.
- Types: id, authorId, title, publicationDate, name are non-empty
  strings. birthYear is an integer number. A wrong type returns 400.
- Missing-field message names the field, e.g. "name is required".
- Empty or missing body returns 400 { "message": "Request body is required" }.
- A PUT body that contains id returns 400
  { "message": "id cannot be changed in the body" }.

### Feature 1: Books (Version 2)
Goal: Books reference an author, and the API supports all book CRUD
operations, each documented and testable in Swagger.

Data model (collection books, custom string ids, not _id):
- id: string, required (e.g. "b1")
- authorId: string, required, must match an existing author's id
- title: string, required
- publicationDate: string, required (YYYY-MM-DD)

Routes:
- GET /books: 200 array of books (each includes authorId); 500
- GET /books/:id: 200 the book; 404 { "message": "Book not found" }; 500
- POST /books: body { id, authorId, title, publicationDate }
  201 the new book; 400 (empty body, missing field, wrong type,
  unknown authorId); 409 (duplicate id); 500
- PUT /books/:id: body { authorId, title, publicationDate }
  200 the updated book; 400 (empty body, missing field, wrong type,
  id in body, unknown authorId); 404 (book not found); 500
- DELETE /books/:id: 204 no body; 404 (book not found); 500

Swagger: every book route documented; POST and PUT include a
requestBody for application/json with fields and an example.
Deployment: routes work locally and on Render; deployed /api-docs
lets someone test every book route.

### Feature 2: Authors (Version 2)
Goal: The API supports all author CRUD operations, each documented and
testable in Swagger, and books can reference authors.

Data model (collection authors, custom string ids, not _id):
- id: string, required (e.g. "a1")
- name: string, required
- birthYear: number (integer), required

Routes:
- GET /authors: 200 array of authors; 500
- GET /authors/:id: 200 the author; 404 { "message": "Author not found" }; 500
- POST /authors: body { id, name, birthYear }
  201 the new author; 400 (empty body, missing field, wrong type);
  409 (duplicate id); 500
- PUT /authors/:id: body { name, birthYear }
  200 the updated author; 400 (empty body, missing field, wrong type,
  id in body); 404 (author not found); 500
- DELETE /authors/:id: 204 no body; 404 (author not found);
  409 { "message": "Author still has books" } (author still has books); 500

Delete rule: If any book has authorId equal to the author's id, nothing
is deleted and the API returns 409. The books check runs before the delete.

Swagger: every author route documented; POST and PUT include a
requestBody for application/json with fields and an example.
Deployment: routes work locally and on Render; deployed /api-docs
lets someone test every author route.

### Known limitations (out of scope this week)
- Delete race: a book could be created for an author between the books
  check and the delete.
- No authentication or authorization.
- No pagination on GET /books or GET /authors.
- Optional improvements: unique index on id (both collections) and an
  index on books.authorId.

### Changes from Version 1
- Added: error message names the missing field
- Added: type validation (strings non-empty, birthYear integer)
- Added: empty or missing body returns 400
- Added: PUT body containing id returns 400 (books and authors)
- Changed: duplicate id on POST /books returns 409 (was 400)
- Added: validation order
- Added: known limitations (delete race, no auth, no pagination,
  optional indexes) which we are NOT fixing this week

## Version 1 (original draft, kept for history)

### Feature 1: Books (Version 1)
Goal: Books reference an author, and the API supports all book CRUD
operations, each documented and testable in Swagger.

Data model (collection books, custom string ids, not _id):
- id: string, required (e.g. "b1")
- authorId: string, required, must match an existing author's id
- title: string, required
- publicationDate: string, required

Relationship to Authors: authorId must match an existing author's
custom id. Create and update requests with a non-matching authorId
return 400.

Routes:
- GET /books: 200 with array; 500
- GET /books/:id: 200; 404; 500
- POST /books: body id, authorId, title, publicationDate.
  201 with new book; 400 (missing field, duplicate id, unknown
  authorId); 500
- PUT /books/:id: body authorId, title, publicationDate.
  200 with updated book; 400 (missing field, unknown authorId);
  404; 500
- DELETE /books/:id: 204 no body; 404; 500

Swagger: every book route is documented.
Deployment: book routes work locally and on Render. Deployed /api-docs
lets someone test every book route from the browser.

### Feature 2: Authors (Version 1)
Goal: The API supports all author CRUD operations, each documented and
testable in Swagger, and books can reference authors.

Data model (collection authors, custom string ids, not _id):
- id: string, required (e.g. "a1")
- name: string, required
- birthYear: number, required

Routes:
- GET /authors: 200, array of authors; 500
- GET /authors/:id: 200, the author; 404 (author not found); 500
- POST /authors: body { "id": "a1", "name": "Frank Herbert",
  "birthYear": 1920 }
  201, the new author; 400 (missing field); 409 (duplicate id); 500
- PUT /authors/:id: body { "name": "Frank Herbert", "birthYear": 1920 }
  200, the updated author; 400 (missing field, or id in body);
  404 (author not found); 500
- DELETE /authors/:id: 204, no body; 404 (author not found);
  409 (author still has books); 500

Delete rule: If an author still has books (any book whose authorId
equals the author's id), DELETE /authors/:id deletes nothing and
returns 409 with { "message": "Author still has books" }. The books
check runs before the delete.

Swagger: every author route is documented. POST and PUT include a
requestBody for application/json with the expected fields and an
example body.
Deployment: author routes work locally and on Render. The deployed
/api-docs page lets someone test every author route from the browser.