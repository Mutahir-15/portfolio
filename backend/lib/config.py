from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        env_parse_list_separator=","
    )

    gemini_api_key: str = Field(alias="GEMINI_API_KEY")
    resend_api_key: str = Field(alias="RESEND_API_KEY")
    allowed_origins: List[str] | str = Field(default=["http://localhost:3000"], alias="ALLOWED_ORIGINS")
    
    debug: bool = Field(default=False, alias="DEBUG")
    port: int = Field(default=8000, alias="PORT")
    environment: str = Field(default="development", alias="ENVIRONMENT")

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return [item.strip() for item in v.split(",")]
        return v

    def __repr__(self):
        return f"Settings(gemini_api_key='***', resend_api_key='***', allowed_origins={repr(self.allowed_origins)}, debug={self.debug}, port={self.port}, environment={repr(self.environment)})"

    def __str__(self):
        return self.__repr__()

# Singleton instance
try:
    settings = Settings()
except Exception as e:
    # This will be caught by the startup guard in main.py
    # But we define it here for the foundational task
    raise e
