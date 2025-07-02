export class Task {
  constructor({ id, title, completed = false, createdAt = new Date() }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}
