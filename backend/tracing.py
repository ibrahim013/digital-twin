import json
import logging
import time
import uuid
from datetime import datetime, timezone
from typing import Any

logger = logging.getLogger("digital_twin.ai")

if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(message)s"))
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    logger.propagate = False


def new_trace_id() -> str:
    return str(uuid.uuid4())


def log_ai_trace(event: str, **fields: Any) -> None:
    payload = {
        "event": event,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        **fields,
    }
    logger.info(json.dumps(payload, default=str))


class BedrockTrace:
    def __init__(self, session_id: str, model_id: str):
        self.trace_id = new_trace_id()
        self.session_id = session_id
        self.model_id = model_id
        self.started_at = time.perf_counter()

    def _base_fields(self) -> dict[str, Any]:
        return {
            "trace_id": self.trace_id,
            "session_id": self.session_id,
            "model_id": self.model_id,
        }

    def log_start(self, history_length: int, user_message_length: int) -> None:
        log_ai_trace(
            "bedrock_invoke_start",
            **self._base_fields(),
            history_length=history_length,
            user_message_length=user_message_length,
        )

    def log_success(
        self,
        usage: dict[str, Any],
        response_length: int,
        stop_reason: str | None = None,
    ) -> None:
        latency_ms = round((time.perf_counter() - self.started_at) * 1000, 2)
        log_ai_trace(
            "bedrock_invoke_success",
            **self._base_fields(),
            latency_ms=latency_ms,
            input_tokens=usage.get("inputTokens"),
            output_tokens=usage.get("outputTokens"),
            total_tokens=usage.get("totalTokens"),
            response_length=response_length,
            stop_reason=stop_reason,
        )

    def log_error(self, error_code: str, error_message: str) -> None:
        latency_ms = round((time.perf_counter() - self.started_at) * 1000, 2)
        log_ai_trace(
            "bedrock_invoke_error",
            **self._base_fields(),
            latency_ms=latency_ms,
            error_code=error_code,
            error_message=error_message,
        )
