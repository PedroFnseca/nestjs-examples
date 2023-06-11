import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from './supabase';
import { User } from './types/user.type'

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  private throwError(error: any) {
    if (error) throw new InternalServerErrorException(error)
  }

  private table = 'user_table'

  async getUsers(): Promise<User[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*');

    this.throwError(error)

    return data as User[]
  }

  async getOneUser(id: number): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
    
    this.throwError(error)

    return data[0] as User
  }

  async insertUser(dataNewuser: User): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .insert(dataNewuser);

    this.throwError(error)
    
    return data as User
  }

  async deleteUser(id: number): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id)
    
    this.throwError(error)

    return data as User
  }

  async updateUser(id: number, user: User): Promise<User> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .update(user)
      .eq('id', id)
    
    this.throwError(error)

    return data as User
  }
}