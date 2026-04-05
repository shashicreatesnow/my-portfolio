"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Add a tag",
}: {
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function addTag(nextTag: string) {
    const tag = nextTag.trim();
    if (!tag || value.includes(tag)) {
      setDraft("");
      return;
    }

    onChange([...value, tag]);
    setDraft("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-2">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((entry) => entry !== tag))}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag(draft);
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={() => addTag(draft)}>
          Add
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions
            .filter((suggestion) => !value.includes(suggestion))
            .map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                size="sm"
                variant="ghost"
                className="rounded-full border border-dashed"
                onClick={() => addTag(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
