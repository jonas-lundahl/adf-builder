import { z } from "zod";

const alignment_mark = z.lazy(() =>
  z.object({ type: z.unknown(), attrs: z.object({ align: z.unknown() }) }),
);

const annotation_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ id: z.string(), annotationType: z.unknown() }),
  }),
);

const backgroundColor_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const block_content = z.unknown();

const blockCard_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.union([
      z.object({
        localId: z.string().optional(),
        url: z.string().optional(),
        datasource: z.object({
          id: z.string(),
          parameters: z.unknown(),
          views: z
            .array(
              z.object({
                properties: z.unknown().optional(),
                type: z.string(),
              }),
            )
            .min(1),
        }),
        width: z.number().optional(),
        layout: z.unknown().optional(),
      }),
      z.object({ url: z.string(), localId: z.string().optional() }),
      z.object({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  }),
);

const blockquote_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.union([
          paragraph_with_no_marks_node,
          orderedList_node,
          bulletList_node,
          codeBlock_node,
          mediaSingle_caption_node,
          mediaSingle_full_node,
          mediaGroup_node,
          extension_with_marks_node,
        ]),
      )
      .min(1),
  }),
);

const bodiedExtension_node = z.lazy(() =>
  z.object({
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
    content: z.array(non_nestable_block_content).min(1),
  }),
);

const bodiedExtension_with_marks_node = z.unknown();

const border_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      size: z.number().min(1).max(3),
      color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
    }),
  }),
);

const breakout_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ mode: z.unknown(), width: z.number().optional() }),
  }),
);

const bulletList_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z.array(listItem_node).min(1),
  }),
);

const caption_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.union([
          hardBreak_node,
          mention_node,
          emoji_node,
          date_node,
          placeholder_node,
          inlineCard_node,
          status_node,
          formatted_text_inline_node,
          code_inline_node,
        ]),
      )
      .optional(),
  }),
);

const code_inline_node = z.unknown();

const code_mark = z.lazy(() => z.object({ type: z.unknown() }));

const codeBlock_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    attrs: z
      .object({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(text_with_no_marks_node).optional(),
  }),
);

const codeBlock_root_only_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(breakout_mark).optional(),
    attrs: z
      .object({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(text_with_no_marks_node).optional(),
  }),
);

const dataConsumer_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ sources: z.array(z.string()).min(1) }),
  }),
);

const date_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      timestamp: z.string().min(1),
      localId: z.string().optional(),
    }),
  }),
);

const decisionItem_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string(), state: z.string() }),
    content: z.array(inline_node).optional(),
  }),
);

const decisionList_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string() }),
    content: z.array(decisionItem_node).min(1),
  }),
);

const doc_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    content: z.array(
      z.union([
        blockCard_node,
        codeBlock_node,
        mediaSingle_caption_node,
        mediaSingle_full_node,
        paragraph_with_alignment_node,
        paragraph_with_indentation_node,
        paragraph_with_no_marks_node,
        taskList_node,
        orderedList_node,
        bulletList_node,
        blockquote_node,
        decisionList_node,
        embedCard_node,
        extension_with_marks_node,
        heading_with_indentation_node,
        heading_with_no_marks_node,
        heading_with_alignment_node,
        mediaGroup_node,
        rule_node,
        panel_node,
        table_node,
        bodiedExtension_with_marks_node,
        expand_node,
        codeBlock_root_only_node,
        layoutSection_full_node,
        expand_root_only_node,
      ]),
    ),
    version: z.unknown(),
  }),
);

const em_mark = z.lazy(() => z.object({ type: z.unknown() }));

const embedCard_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      url: z.string(),
      layout: z.unknown(),
      width: z.number().max(100).optional(),
      originalHeight: z.number().optional(),
      originalWidth: z.number().optional(),
      localId: z.string().optional(),
    }),
  }),
);

const emoji_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      shortName: z.string(),
      id: z.string().optional(),
      text: z.string().optional(),
      localId: z.string().optional(),
    }),
  }),
);

const expand_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    attrs: z
      .object({ title: z.string().optional(), localId: z.string().optional() })
      .optional(),
    content: z
      .array(
        z.union([non_nestable_block_content, nestedExpand_with_no_marks_node]),
      )
      .min(1),
  }),
);

const expand_root_only_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(breakout_mark).optional(),
    attrs: z
      .object({ title: z.string().optional(), localId: z.string().optional() })
      .optional(),
    content: z
      .array(
        z.union([non_nestable_block_content, nestedExpand_with_no_marks_node]),
      )
      .min(1),
  }),
);

const extension_node = z.lazy(() =>
  z.object({
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
  }),
);

const extension_with_marks_node = z.unknown();

const formatted_text_inline_node = z.unknown();

const fragment_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      localId: z.string().min(1),
      name: z.string().optional(),
    }),
  }),
);

const hardBreak_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z
      .object({ text: z.unknown().optional(), localId: z.string().optional() })
      .optional(),
  }),
);

const heading_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    attrs: z.object({
      level: z.number().min(1).max(6),
      localId: z.string().optional(),
    }),
    content: z.array(inline_node).optional(),
  }),
);

const heading_with_alignment_node = z.unknown();

const heading_with_indentation_node = z.unknown();

const heading_with_no_marks_node = z.unknown();

const indentation_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ level: z.number().min(1).max(6) }),
  }),
);

const inline_node = z.unknown();

const inlineCard_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.union([
      z.object({ url: z.string(), localId: z.string().optional() }),
      z.object({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  }),
);

const inlineExtension_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    attrs: z.object({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      localId: z.string().min(1).optional(),
    }),
  }),
);

const inlineExtension_with_marks_node = z.unknown();

const layoutColumn_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      width: z.number().max(100),
      localId: z.string().optional(),
    }),
    content: z.array(block_content).min(1),
  }),
);

const layoutSection_full_node = z.unknown();

const layoutSection_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(breakout_mark).optional(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z.array(layoutColumn_node),
  }),
);

const link_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      href: z.string(),
      title: z.string().optional(),
      id: z.string().optional(),
      collection: z.string().optional(),
      occurrenceKey: z.string().optional(),
    }),
  }),
);

const listItem_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z.array(z.unknown()).min(1),
  }),
);

const media_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z
      .array(z.union([link_mark, annotation_mark, border_mark]))
      .optional(),
    attrs: z.union([
      z.object({
        type: z.unknown(),
        localId: z.string().optional(),
        id: z.string().min(1),
        alt: z.string().optional(),
        collection: z.string(),
        height: z.number().optional(),
        occurrenceKey: z.string().min(1).optional(),
        width: z.number().optional(),
      }),
      z.object({
        type: z.unknown(),
        localId: z.string().optional(),
        alt: z.string().optional(),
        height: z.number().optional(),
        width: z.number().optional(),
        url: z.string(),
      }),
    ]),
  }),
);

const mediaGroup_node = z.lazy(() =>
  z.object({ type: z.unknown(), content: z.array(media_node).min(1) }),
);

const mediaInline_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z
      .array(z.union([link_mark, annotation_mark, border_mark]))
      .optional(),
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
  }),
);

const mediaSingle_caption_node = z.unknown();

const mediaSingle_full_node = z.unknown();

const mediaSingle_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(link_mark).optional(),
    attrs: z
      .union([
        z.object({
          localId: z.string().optional(),
          width: z.number().max(100).optional(),
          layout: z.unknown(),
          widthType: z.unknown().optional(),
        }),
        z.object({
          localId: z.string().optional(),
          width: z.number(),
          widthType: z.unknown(),
          layout: z.unknown(),
        }),
      ])
      .optional(),
  }),
);

const mention_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      id: z.string(),
      localId: z.string().optional(),
      text: z.string().optional(),
      accessLevel: z.string().optional(),
      userType: z.unknown().optional(),
    }),
  }),
);

const nestedExpand_content = z.unknown();

const nestedExpand_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      title: z.string().optional(),
      localId: z.string().optional(),
    }),
    content: nestedExpand_content,
  }),
);

const nestedExpand_with_no_marks_node = z.unknown();

const non_nestable_block_content = z.unknown();

const orderedList_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z
      .object({ order: z.number().optional(), localId: z.string().optional() })
      .optional(),
    content: z.array(listItem_node).min(1),
  }),
);

const panel_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      panelType: z.unknown(),
      panelIcon: z.string().optional(),
      panelIconId: z.string().optional(),
      panelIconText: z.string().optional(),
      panelColor: z.string().optional(),
      localId: z.string().optional(),
    }),
    content: z
      .array(
        z.union([
          paragraph_with_no_marks_node,
          heading_with_no_marks_node,
          bulletList_node,
          orderedList_node,
          blockCard_node,
          mediaGroup_node,
          mediaSingle_caption_node,
          mediaSingle_full_node,
          codeBlock_node,
          taskList_node,
          rule_node,
          decisionList_node,
          extension_with_marks_node,
        ]),
      )
      .min(1),
  }),
);

const paragraph_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z.array(inline_node).optional(),
  }),
);

const paragraph_with_alignment_node = z.unknown();

const paragraph_with_indentation_node = z.unknown();

const paragraph_with_no_marks_node = z.unknown();

const placeholder_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ text: z.string(), localId: z.string().optional() }),
  }),
);

const rule_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
  }),
);

const status_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({
      text: z.string().min(1),
      color: z.unknown(),
      localId: z.string().optional(),
      style: z.string().optional(),
    }),
  }),
);

const strike_mark = z.lazy(() => z.object({ type: z.unknown() }));

const strong_mark = z.lazy(() => z.object({ type: z.unknown() }));

const subsup_mark = z.lazy(() =>
  z.object({ type: z.unknown(), attrs: z.object({ type: z.unknown() }) }),
);

const table_cell_content = z.unknown();

const table_cell_node = z.lazy(() =>
  z.object({
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
    content: table_cell_content,
  }),
);

const table_header_node = z.lazy(() =>
  z.object({
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
    content: table_cell_content,
  }),
);

const table_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(fragment_mark).optional(),
    attrs: z
      .object({
        displayMode: z.unknown().optional(),
        isNumberColumnEnabled: z.boolean().optional(),
        layout: z.unknown().optional(),
        localId: z.string().min(1).optional(),
        width: z.number().optional(),
      })
      .optional(),
    content: z.array(table_row_node).min(1),
  }),
);

const table_row_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string().optional() }).optional(),
    content: z.array(z.union([table_cell_node, table_header_node])),
  }),
);

const taskItem_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string(), state: z.unknown() }),
    content: z.array(inline_node).optional(),
  }),
);

const taskList_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ localId: z.string() }),
    content: z.array(z.unknown()).min(1),
  }),
);

const text_node = z.lazy(() =>
  z.object({
    type: z.unknown(),
    marks: z.array(z.unknown()).optional(),
    text: z.string().min(1),
  }),
);

const text_with_no_marks_node = z.unknown();

const textColor_mark = z.lazy(() =>
  z.object({
    type: z.unknown(),
    attrs: z.object({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const underline_mark = z.lazy(() => z.object({ type: z.unknown() }));
