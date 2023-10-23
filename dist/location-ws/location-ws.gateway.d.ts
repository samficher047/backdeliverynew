import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { LocationWsService } from './location-ws.service';
export declare class LocationWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly locationWsService;
    private readonly jwtService;
    server: Server;
    constructor(locationWsService: LocationWsService, jwtService: JwtService);
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(socket: Socket): void;
    handleEvent(socket: Socket, data: JSON): void;
}
