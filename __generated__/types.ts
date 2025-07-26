import { z } from "zod";

const alignment_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ align: z.unknown() }),
});

const annotation_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ id: z.string(), annotationType: z.unknown() }),
});

const backgroundColor_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
});

const block_content = z.unknown();

const blockCard_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const blockquote_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()).min(1),
});

const bodiedExtension_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({
    extensionKey: z.string().min(1),
    extensionType: z.string().min(1),
    parameters: z.unknown().optional(),
    text: z.string().optional(),
    layout: z.unknown().optional(),
    localId: z.string().min(1).optional(),
  }),
  content: z.array(z.unknown()).min(1),
});

const bodiedExtension_with_marks_node = z.unknown();

const border_mark = z.object({
  type: z.unknown(),
  attrs: z.object({
    size: z.number().min(1).max(3),
    color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
  }),
});

const breakout_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ mode: z.unknown(), width: z.number().optional() }),
});

const bulletList_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()).min(1),
});

const caption_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()).optional(),
});

const code_inline_node = z.unknown();

const code_mark = z.object({ type: z.unknown() });

const codeBlock_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .object({
      language: z.string().optional(),
      uniqueId: z.string().optional(),
      localId: z.string().optional(),
    })
    .optional(),
  content: z.array(z.unknown()).optional(),
});

const codeBlock_root_only_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .object({
      language: z.string().optional(),
      uniqueId: z.string().optional(),
      localId: z.string().optional(),
    })
    .optional(),
  content: z.array(z.unknown()).optional(),
});

const dataConsumer_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ sources: z.array(z.string()).min(1) }),
});

const date_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    timestamp: z.string().min(1),
    localId: z.string().optional(),
  }),
});

const decisionItem_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string(), state: z.string() }),
  content: z.array(z.unknown()).optional(),
});

const decisionList_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string() }),
  content: z.array(z.unknown()).min(1),
});

const doc_node = z.object({
  type: z.unknown(),
  content: z.array(z.unknown()),
  version: z.unknown(),
});

const em_mark = z.object({ type: z.unknown() });

const embedCard_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    url: z.string(),
    layout: z.unknown(),
    width: z.number().max(100).optional(),
    originalHeight: z.number().optional(),
    originalWidth: z.number().optional(),
    localId: z.string().optional(),
  }),
});

const emoji_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    shortName: z.string(),
    id: z.string().optional(),
    text: z.string().optional(),
    localId: z.string().optional(),
  }),
});

const expand_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .object({ title: z.string().optional(), localId: z.string().optional() })
    .optional(),
  content: z.array(z.unknown()).min(1),
});

const expand_root_only_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .object({ title: z.string().optional(), localId: z.string().optional() })
    .optional(),
  content: z.array(z.unknown()).min(1),
});

const extension_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({
    extensionKey: z.string().min(1),
    extensionType: z.string().min(1),
    parameters: z.unknown().optional(),
    text: z.string().optional(),
    layout: z.unknown().optional(),
    localId: z.string().min(1).optional(),
  }),
});

const extension_with_marks_node = z.unknown();

const formatted_text_inline_node = z.unknown();

const fragment_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().min(1), name: z.string().optional() }),
});

const hardBreak_node = z.object({
  type: z.unknown(),
  attrs: z
    .object({ text: z.unknown().optional(), localId: z.string().optional() })
    .optional(),
});

const heading_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({
    level: z.number().min(1).max(6),
    localId: z.string().optional(),
  }),
  content: z.array(z.unknown()).optional(),
});

const heading_with_alignment_node = z.unknown();

const heading_with_indentation_node = z.unknown();

const heading_with_no_marks_node = z.unknown();

const indentation_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ level: z.number().min(1).max(6) }),
});

const inline_node = z.unknown();

const inlineCard_node = z.object({ type: z.unknown(), attrs: z.unknown() });

const inlineExtension_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({
    extensionKey: z.string().min(1),
    extensionType: z.string().min(1),
    parameters: z.unknown().optional(),
    text: z.string().optional(),
    localId: z.string().min(1).optional(),
  }),
});

const inlineExtension_with_marks_node = z.unknown();

const layoutColumn_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    width: z.number().max(100),
    localId: z.string().optional(),
  }),
  content: z.array(z.unknown()).min(1),
});

const layoutSection_full_node = z.unknown();

const layoutSection_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()),
});

const link_mark = z.object({
  type: z.unknown(),
  attrs: z.object({
    href: z.string(),
    title: z.string().optional(),
    id: z.string().optional(),
    collection: z.string().optional(),
    occurrenceKey: z.string().optional(),
  }),
});

const listItem_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()).min(1),
});

const media_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.unknown(),
});

const mediaGroup_node = z.object({
  type: z.unknown(),
  content: z.array(z.unknown()).min(1),
});

const mediaInline_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({
    type: z.unknown().optional(),
    localId: z.string().optional(),
    id: z.string().min(1),
    alt: z.string().optional(),
    collection: z.string(),
    occurrenceKey: z.string().min(1).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    data: z.unknown().optional(),
  }),
});

const mediaSingle_caption_node = z.unknown();

const mediaSingle_full_node = z.unknown();

const mediaSingle_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.unknown().optional(),
});

const mention_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    id: z.string(),
    localId: z.string().optional(),
    text: z.string().optional(),
    accessLevel: z.string().optional(),
    userType: z.unknown().optional(),
  }),
});

const nestedExpand_content = z.unknown();

const nestedExpand_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    title: z.string().optional(),
    localId: z.string().optional(),
  }),
  content: z.unknown(),
});

const nestedExpand_with_no_marks_node = z.unknown();

const non_nestable_block_content = z.unknown();

const orderedList_node = z.object({
  type: z.unknown(),
  attrs: z
    .object({ order: z.number().optional(), localId: z.string().optional() })
    .optional(),
  content: z.array(z.unknown()).min(1),
});

const panel_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    panelType: z.unknown(),
    panelIcon: z.string().optional(),
    panelIconId: z.string().optional(),
    panelIconText: z.string().optional(),
    panelColor: z.string().optional(),
    localId: z.string().optional(),
  }),
  content: z.array(z.unknown()).min(1),
});

const paragraph_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()).optional(),
});

const paragraph_with_alignment_node = z.unknown();

const paragraph_with_indentation_node = z.unknown();

const paragraph_with_no_marks_node = z.unknown();

const placeholder_node = z.object({
  type: z.unknown(),
  attrs: z.object({ text: z.string(), localId: z.string().optional() }),
});

const rule_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
});

const status_node = z.object({
  type: z.unknown(),
  attrs: z.object({
    text: z.string().min(1),
    color: z.unknown(),
    localId: z.string().optional(),
    style: z.string().optional(),
  }),
});

const strike_mark = z.object({ type: z.unknown() });

const strong_mark = z.object({ type: z.unknown() });

const subsup_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ type: z.unknown() }),
});

const table_cell_content = z.unknown();

const table_cell_node = z.object({
  type: z.unknown(),
  attrs: z
    .object({
      colspan: z.number().optional(),
      rowspan: z.number().optional(),
      colwidth: z.array(z.number()).optional(),
      background: z.string().optional(),
      localId: z.string().optional(),
    })
    .optional(),
  content: z.unknown(),
});

const table_header_node = z.object({
  type: z.unknown(),
  attrs: z
    .object({
      colspan: z.number().optional(),
      rowspan: z.number().optional(),
      colwidth: z.array(z.number()).optional(),
      background: z.string().optional(),
      localId: z.string().optional(),
    })
    .optional(),
  content: z.unknown(),
});

const table_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .object({
      displayMode: z.unknown().optional(),
      isNumberColumnEnabled: z.boolean().optional(),
      layout: z.unknown().optional(),
      localId: z.string().min(1).optional(),
      width: z.number().optional(),
    })
    .optional(),
  content: z.array(z.unknown()).min(1),
});

const table_row_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string().optional() }).optional(),
  content: z.array(z.unknown()),
});

const taskItem_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string(), state: z.unknown() }),
  content: z.array(z.unknown()).optional(),
});

const taskList_node = z.object({
  type: z.unknown(),
  attrs: z.object({ localId: z.string() }),
  content: z.array(z.unknown()).min(1),
});

const text_node = z.object({
  type: z.unknown(),
  marks: z.array(z.unknown()).optional(),
  text: z.string().min(1),
});

const text_with_no_marks_node = z.unknown();

const textColor_mark = z.object({
  type: z.unknown(),
  attrs: z.object({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
});

const underline_mark = z.object({ type: z.unknown() });
