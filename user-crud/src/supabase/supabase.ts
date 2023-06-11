import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name)
  private clientInstance: SupabaseClient

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService
  ) { }
  
  getClient() {
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST')
      return this.clientInstance
    }

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
          persistSession: false
        }
      }
    );

    this.clientInstance.auth.setSession(
      ExtractJwt.fromAuthHeaderAsBearerToken()(this.request),
    );

    return this.clientInstance;
  }
}