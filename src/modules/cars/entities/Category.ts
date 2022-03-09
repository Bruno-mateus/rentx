import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'

@Entity("categories")
class Category {
  @PrimaryColumn("id")
  id?: string;
  @Column("name")
  name: string;
  @Column("description")
  description: string;
  @CreateDateColumn("created_at")
  createdAt: Date;


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
