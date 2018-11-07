#include <uv.h>
#include <napi.h>

using namespace Napi;

Napi::Value Run(const Napi::CallbackInfo& info) {
  Napi::HandleScope scope(env);
  uv_run(uv_default_loop(), UV_RUN_ONCE);
  return env.Undefined();
}

static Napi::Object init(Napi::Env env, Napi::Object exports) {
  (target).Set(Napi::String::New(env, "run"), Napi::GetFunction(Napi::Function::New(env, Run)));
}

NODE_API_MODULE(deasync, init)
