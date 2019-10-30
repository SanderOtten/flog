export class Parent {
  id: string;
  name: string;
  email: string;
  passwordt: string;
  dateOfBirth: string;
  createdAt: string;
  children: Child[];
}

export class Child {
  id: string;
  name: string;
  dateOfBirth: string;
  createdAt: string;
  parentsIds: string[];
  parents: Parent[];
}

export class Post {
  id: string;
  about: Child;
  author: Parent;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
