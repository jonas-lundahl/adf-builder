import { z } from "zod";

const alignment_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const annotation_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const backgroundColor_mark = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
});

const block_content = z.unknown();

const blockCard_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const blockquote_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const bodiedExtension_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const bodiedExtension_with_marks_node = z.unknown();

const border_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const breakout_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const bulletList_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const caption_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown().optional(),
});

const code_inline_node = z.unknown();

const code_mark = z.object({ type: z.unknown() });

const codeBlock_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown().optional(),
});

const codeBlock_root_only_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown().optional(),
});

const dataConsumer_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const date_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const decisionItem_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown().optional(),
});

const decisionList_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const doc_node = z.object({
  type: z.unknown(),
  content: z.unknown(),
  version: z.unknown(),
});

const em_mark = z.object({ type: z.unknown() });

const embedCard_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const emoji_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const expand_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const expand_root_only_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const extension_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
});

const extension_with_marks_node = z.unknown();

const formatted_text_inline_node = z.unknown();

const fragment_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const hardBreak_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
});

const heading_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
  content: z.unknown().optional(),
});

const heading_with_alignment_node = z.unknown();

const heading_with_indentation_node = z.unknown();

const heading_with_no_marks_node = z.unknown();

const indentation_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const inline_node = z.unknown();

const inlineCard_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const inlineExtension_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
});

const inlineExtension_with_marks_node = z.unknown();

const layoutColumn_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const layoutSection_full_node = z.unknown();

const layoutSection_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const link_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const listItem_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const media_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
});

const mediaGroup_node = z.object({ type: z.unknown(), content: z.unknown() });

const mediaInline_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown(),
});

const mediaSingle_caption_node = z.unknown();

const mediaSingle_full_node = z.unknown();

const mediaSingle_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
});

const mention_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const nestedExpand_content = z.unknown();

const nestedExpand_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const nestedExpand_with_no_marks_node = z.unknown();

const non_nestable_block_content = z.unknown();

const orderedList_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const panel_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const paragraph_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown().optional(),
});

const paragraph_with_alignment_node = z.unknown();

const paragraph_with_indentation_node = z.unknown();

const paragraph_with_no_marks_node = z.unknown();

const placeholder_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const rule_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
});

const status_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const strike_mark = z.object({ type: z.unknown() });

const strong_mark = z.object({ type: z.unknown() });

const subsup_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const table_cell_content = z.unknown();

const table_cell_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const table_header_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const table_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const table_row_node = z.object({
  type: z.unknown(),
  attrs: z.unknown().optional(),
  content: z.unknown(),
});

const taskItem_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown().optional(),
});

const taskList_node = z.object({
  type: z.unknown(),
  attrs: z.unknown(),
  content: z.unknown(),
});

const text_node = z.object({
  type: z.unknown(),
  marks: z.unknown().optional(),
  text: z.unknown(),
});

const text_with_no_marks_node = z.unknown();

const textColor_mark = z.object({ type: z.unknown(), attrs: z.unknown() });

const underline_mark = z.object({ type: z.unknown() });
