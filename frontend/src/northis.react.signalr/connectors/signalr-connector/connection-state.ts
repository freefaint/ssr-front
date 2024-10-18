/**
 * Представляет состояние соединения.
 */
export enum ConnectionState {
    Disconnected = "Disconnected",
    Connecting = "Connecting",
    Connected = "Connected",
    Disconnecting = "Disconnecting",
    Reconnecting = "Reconnecting"
}