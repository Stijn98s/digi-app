export * from './authentication.service';
import { AuthenticationApiClient } from './authentication.service';
export * from './incremental.service';
import { IncrementalApiClient } from './incremental.service';
export * from './players.service';
import { PlayersApiClient } from './players.service';
export const APIS = [AuthenticationApiClient, IncrementalApiClient, PlayersApiClient];
