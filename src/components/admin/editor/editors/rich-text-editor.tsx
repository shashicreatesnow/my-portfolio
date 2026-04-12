"use client";

import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { RichTextToolbar } from "./rich-text-toolbar";

export function RichTextEditor({
  value,
  onChange,
  compact = false,
  placeholder = "Start typing...",
}: {
  value: string;
  onChange: (html: string) => void;
  compact?: boolean;
  placeholder?: string;
}) {
  const isInternalUpdate = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1] },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor: currentEditor }) => {
      isInternalUpdate.current = true;
      onChange(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose-editor min-h-[6rem] w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm focus:outline-none ${
          compact ? "min-h-[4rem]" : "min-h-[6rem]"
        }`,
      },
    },
  });

  // Sync external value changes (e.g. when blocks are replaced/loaded)
  // but skip if the change originated from the editor itself
  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <RichTextToolbar editor={editor} compact={compact} />
      <EditorContent editor={editor} />
    </div>
  );
}
