import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces';
import { LocationWsService } from './location-ws.service';

@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class LocationWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(
    private readonly locationWsService: LocationWsService,
    private readonly jwtService: JwtService,
  ) { }

  async handleConnection(socket: Socket, ...args: any[]) {
    const token = socket.handshake.headers.auth as string;
    const idUserDeliveryMen = socket.handshake.headers.iduserdeliverymen;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.locationWsService.registerUser(socket, payload.id);
      if (!idUserDeliveryMen) return;
      socket.join(`${idUserDeliveryMen}`);
    } catch (error) {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) { }

  @SubscribeMessage('l')
  handleEvent(@ConnectedSocket() socket: Socket, @MessageBody() data: JSON) {
    if (!socket['isAuth']) return;
    this.server.to(`${data['id']}`).emit('l', data['p']);
    this.locationWsService.updateLocation(data['id'], data['p']);
  }
}
