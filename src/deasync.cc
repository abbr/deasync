#include <node.h>
#include <uv.h>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::Value;

void Run(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	uv_run(uv_default_loop(), UV_RUN_ONCE);
	args.GetReturnValue().Set(Undefined(isolate));
}

void Init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "run", Run);
}

NODE_MODULE(deasync, Init)
