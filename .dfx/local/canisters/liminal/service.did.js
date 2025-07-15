export const idlFactory = ({ IDL }) => {
  const BatchId = IDL.Nat;
  const Key = IDL.Text;
  const Header = IDL.Tuple(IDL.Text, IDL.Text);
  const SetAssetPropertiesArguments = IDL.Record({
    'key' : Key,
    'headers' : IDL.Opt(IDL.Opt(IDL.Vec(Header))),
    'is_aliased' : IDL.Opt(IDL.Opt(IDL.Bool)),
    'allow_raw_access' : IDL.Opt(IDL.Opt(IDL.Bool)),
    'max_age' : IDL.Opt(IDL.Opt(IDL.Nat64)),
  });
  const CreateAssetArguments = IDL.Record({
    'key' : Key,
    'content_type' : IDL.Text,
    'headers' : IDL.Opt(IDL.Vec(Header)),
    'allow_raw_access' : IDL.Opt(IDL.Bool),
    'max_age' : IDL.Opt(IDL.Nat64),
    'enable_aliasing' : IDL.Opt(IDL.Bool),
  });
  const UnsetAssetContentArguments = IDL.Record({
    'key' : Key,
    'content_encoding' : IDL.Text,
  });
  const DeleteAssetArguments = IDL.Record({ 'key' : Key });
  const ChunkId = IDL.Nat;
  const SetAssetContentArguments = IDL.Record({
    'key' : Key,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'chunk_ids' : IDL.Vec(ChunkId),
    'content_encoding' : IDL.Text,
  });
  const ClearArguments = IDL.Record({});
  const BatchOperationKind = IDL.Variant({
    'SetAssetProperties' : SetAssetPropertiesArguments,
    'CreateAsset' : CreateAssetArguments,
    'UnsetAssetContent' : UnsetAssetContentArguments,
    'DeleteAsset' : DeleteAssetArguments,
    'SetAssetContent' : SetAssetContentArguments,
    'Clear' : ClearArguments,
  });
  const CommitBatchArguments = IDL.Record({
    'batch_id' : BatchId,
    'operations' : IDL.Vec(BatchOperationKind),
  });
  const CreateBatchResponse = IDL.Record({ 'batch_id' : BatchId });
  const CreateChunkArguments = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'batch_id' : BatchId,
  });
  const CreateChunkResponse = IDL.Record({ 'chunk_id' : IDL.Nat });
  const CreateChunksArguments = IDL.Record({
    'content' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'batch_id' : BatchId,
  });
  const CreateChunksResponse = IDL.Record({ 'chunk_ids' : IDL.Vec(ChunkId) });
  const ProtectedRoute = IDL.Record({
    'cmacs' : IDL.Vec(IDL.Text),
    'path' : IDL.Text,
    'scan_count' : IDL.Nat,
  });
  const RawQueryHttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(Header),
    'certificate_version' : IDL.Opt(IDL.Nat16),
  });
  const StreamingToken = IDL.Vec(IDL.Nat8);
  const StreamingCallbackResponse = IDL.Record({
    'token' : IDL.Opt(StreamingToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingToken],
      [StreamingCallbackResponse],
      ['query'],
    );
  const CallbackStreamingStrategy = IDL.Record({
    'token' : StreamingToken,
    'callback' : StreamingCallback,
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : CallbackStreamingStrategy,
  });
  const RawQueryHttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(Header),
    'upgrade' : IDL.Opt(IDL.Bool),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const RawUpdateHttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(Header),
  });
  const RawUpdateHttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(Header),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const Time = IDL.Int;
  const AssetEncodingDetails = IDL.Record({
    'modified' : Time,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'length' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const AssetDetails = IDL.Record({
    'key' : Key,
    'encodings' : IDL.Vec(AssetEncodingDetails),
    'content_type' : IDL.Text,
  });
  const Actor = IDL.Service({
    'add_protected_route' : IDL.Func([IDL.Text], [], []),
    'append_route_cmacs' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], []),
    'commit_batch' : IDL.Func([CommitBatchArguments], [], []),
    'create_batch' : IDL.Func([IDL.Record({})], [CreateBatchResponse], []),
    'create_chunk' : IDL.Func(
        [CreateChunkArguments],
        [CreateChunkResponse],
        [],
      ),
    'create_chunks' : IDL.Func(
        [CreateChunksArguments],
        [CreateChunksResponse],
        [],
      ),
    'get_route_cmacs' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'get_route_protection' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ProtectedRoute)],
        ['query'],
      ),
    'http_request' : IDL.Func(
        [RawQueryHttpRequest],
        [RawQueryHttpResponse],
        ['query'],
      ),
    'http_request_streaming_callback' : IDL.Func(
        [StreamingToken],
        [StreamingCallbackResponse],
        ['query'],
      ),
    'http_request_update' : IDL.Func(
        [RawUpdateHttpRequest],
        [RawUpdateHttpResponse],
        [],
      ),
    'list' : IDL.Func([IDL.Record({})], [IDL.Vec(AssetDetails)], ['query']),
    'update_route_cmacs' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], []),
  });
  return Actor;
};
export const init = ({ IDL }) => { return []; };
