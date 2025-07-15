import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Actor {
  'add_protected_route' : ActorMethod<[string], undefined>,
  'append_route_cmacs' : ActorMethod<[string, Array<string>], undefined>,
  'commit_batch' : ActorMethod<[CommitBatchArguments], undefined>,
  'create_batch' : ActorMethod<[{}], CreateBatchResponse>,
  'create_chunk' : ActorMethod<[CreateChunkArguments], CreateChunkResponse>,
  'create_chunks' : ActorMethod<[CreateChunksArguments], CreateChunksResponse>,
  'get_route_cmacs' : ActorMethod<[string], Array<string>>,
  'get_route_protection' : ActorMethod<[string], [] | [ProtectedRoute]>,
  'http_request' : ActorMethod<[RawQueryHttpRequest], RawQueryHttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingToken],
    StreamingCallbackResponse
  >,
  'http_request_update' : ActorMethod<
    [RawUpdateHttpRequest],
    RawUpdateHttpResponse
  >,
  'list' : ActorMethod<[{}], Array<AssetDetails>>,
  'update_route_cmacs' : ActorMethod<[string, Array<string>], undefined>,
}
export interface AssetDetails {
  'key' : Key,
  'encodings' : Array<AssetEncodingDetails>,
  'content_type' : string,
}
export interface AssetEncodingDetails {
  'modified' : Time,
  'sha256' : [] | [Uint8Array | number[]],
  'length' : bigint,
  'content_encoding' : string,
}
export type BatchId = bigint;
export type BatchOperationKind = {
    'SetAssetProperties' : SetAssetPropertiesArguments
  } |
  { 'CreateAsset' : CreateAssetArguments } |
  { 'UnsetAssetContent' : UnsetAssetContentArguments } |
  { 'DeleteAsset' : DeleteAssetArguments } |
  { 'SetAssetContent' : SetAssetContentArguments } |
  { 'Clear' : ClearArguments };
export interface CallbackStreamingStrategy {
  'token' : StreamingToken,
  'callback' : StreamingCallback,
}
export type ChunkId = bigint;
export type ClearArguments = {};
export interface CommitBatchArguments {
  'batch_id' : BatchId,
  'operations' : Array<BatchOperationKind>,
}
export interface CreateAssetArguments {
  'key' : Key,
  'content_type' : string,
  'headers' : [] | [Array<Header>],
  'allow_raw_access' : [] | [boolean],
  'max_age' : [] | [bigint],
  'enable_aliasing' : [] | [boolean],
}
export interface CreateBatchResponse { 'batch_id' : BatchId }
export interface CreateChunkArguments {
  'content' : Uint8Array | number[],
  'batch_id' : BatchId,
}
export interface CreateChunkResponse { 'chunk_id' : bigint }
export interface CreateChunksArguments {
  'content' : Array<Uint8Array | number[]>,
  'batch_id' : BatchId,
}
export interface CreateChunksResponse { 'chunk_ids' : Array<ChunkId> }
export interface DeleteAssetArguments { 'key' : Key }
export type Header = [string, string];
export type Key = string;
export interface ProtectedRoute {
  'cmacs' : Array<string>,
  'path' : string,
  'scan_count' : bigint,
}
export interface RawQueryHttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<Header>,
  'certificate_version' : [] | [number],
}
export interface RawQueryHttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<Header>,
  'upgrade' : [] | [boolean],
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface RawUpdateHttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<Header>,
}
export interface RawUpdateHttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<Header>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface SetAssetContentArguments {
  'key' : Key,
  'sha256' : [] | [Uint8Array | number[]],
  'chunk_ids' : Array<ChunkId>,
  'content_encoding' : string,
}
export interface SetAssetPropertiesArguments {
  'key' : Key,
  'headers' : [] | [[] | [Array<Header>]],
  'is_aliased' : [] | [[] | [boolean]],
  'allow_raw_access' : [] | [[] | [boolean]],
  'max_age' : [] | [[] | [bigint]],
}
export type StreamingCallback = ActorMethod<
  [StreamingToken],
  StreamingCallbackResponse
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingToken],
  'body' : Uint8Array | number[],
}
export type StreamingStrategy = { 'Callback' : CallbackStreamingStrategy };
export type StreamingToken = Uint8Array | number[];
export type Time = bigint;
export interface UnsetAssetContentArguments {
  'key' : Key,
  'content_encoding' : string,
}
export interface _SERVICE extends Actor {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
