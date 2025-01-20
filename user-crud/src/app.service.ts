import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from './supabase';
import { User } from './types/user.type';

@Injectable()
export class AppService {
  private readonly table = 'user_table';

  constructor(private readonly supabase: Supabase) {}

  private handleError(error: any) {
    if (error) throw new InternalServerErrorException(error);
  }

  async getUsers(): Promise<User[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*');

    this.handleError(error);
    return data as User[];
  }

  async getOneUser(id: number): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    this.handleError(error);
    return data as User;
  }

  async insertUser(newUser: User): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .insert(newUser)
      .select()
      .single();

    this.handleError(error);
    return data as User;
  }

  async deleteUser(id: number): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id)
      .select()
      .single();

    this.handleError(error);
    return data as User;
  }

  async updateUser(id: number, updatedUser: Partial<User>): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .update(updatedUser)
      .eq('id', id)
      .select()
      .single();

    this.handleError(error);
    return data as User;
  }
}