import { z } from "zod";

const alignment_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("alignment")]),
    attrs: z.strictObject({
      align: z.union([z.literal("center"), z.literal("end")]),
    }),
  }),
);

const annotation_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("annotation")]),
    attrs: z.strictObject({
      id: z.string(),
      annotationType: z.union([z.literal("inlineComment")]),
    }),
  }),
);

const backgroundColor_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("backgroundColor")]),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const block_content = z.lazy(() =>
  z.union([
    blockCard_node,
    paragraph_with_no_marks_node,
    paragraph_with_alignment_node,
    paragraph_with_indentation_node,
    mediaSingle_caption_node,
    mediaSingle_full_node,
    codeBlock_node,
    taskList_node,
    bulletList_node,
    orderedList_node,
    heading_with_no_marks_node,
    heading_with_alignment_node,
    heading_with_indentation_node,
    mediaGroup_node,
    decisionList_node,
    rule_node,
    panel_node,
    blockquote_node,
    extension_with_marks_node,
    embedCard_node,
    table_node,
    expand_node,
    bodiedExtension_with_marks_node,
  ]),
);

const blockCard_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("blockCard")]),
    attrs: z.union([
      z.strictObject({
        localId: z.string().optional(),
        url: z.string().optional(),
        datasource: z.strictObject({
          id: z.string(),
          parameters: z.unknown(),
          views: z
            .array(
              z.strictObject({
                properties: z.unknown().optional(),
                type: z.string(),
              }),
            )
            .min(1),
        }),
        width: z.number().optional(),
        layout: z
          .union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ])
          .optional(),
      }),
      z.strictObject({ url: z.string(), localId: z.string().optional() }),
      z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  }),
);

const blockquote_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("blockquote")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
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
  z.strictObject({
    type: z.union([z.literal("bodiedExtension")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      layout: z
        .union([
          z.literal("wide"),
          z.literal("full-width"),
          z.literal("default"),
        ])
        .optional(),
      localId: z.string().min(1).optional(),
    }),
    content: z.array(non_nestable_block_content).min(1),
  }),
);

const bodiedExtension_with_marks_node = z.lazy(() =>
  z.intersection(
    bodiedExtension_node,
    z.object({
      marks: z.array(z.union([dataConsumer_mark, fragment_mark])).optional(),
    }),
  ),
);

const border_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("border")]),
    attrs: z.strictObject({
      size: z.number().min(1).max(3),
      color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
    }),
  }),
);

const breakout_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("breakout")]),
    attrs: z.strictObject({
      mode: z.union([z.literal("wide"), z.literal("full-width")]),
      width: z.number().optional(),
    }),
  }),
);

const bulletList_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("bulletList")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(listItem_node).min(1),
  }),
);

const caption_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("caption")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
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

const code_inline_node = z.lazy(() =>
  z.intersection(
    text_node,
    z.object({
      marks: z
        .array(z.union([code_mark, link_mark, annotation_mark]))
        .optional(),
    }),
  ),
);

const code_mark = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("code")]) }),
);

const codeBlock_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("codeBlock")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z
      .strictObject({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(text_with_no_marks_node).optional(),
  }),
);

const codeBlock_root_only_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("codeBlock")]),
    marks: z.array(breakout_mark).optional(),
    attrs: z
      .strictObject({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(text_with_no_marks_node).optional(),
  }),
);

const dataConsumer_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("dataConsumer")]),
    attrs: z.strictObject({ sources: z.array(z.string()).min(1) }),
  }),
);

const date_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("date")]),
    attrs: z.strictObject({
      timestamp: z.string().min(1),
      localId: z.string().optional(),
    }),
  }),
);

const decisionItem_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("decisionItem")]),
    attrs: z.strictObject({ localId: z.string(), state: z.string() }),
    content: z.array(inline_node).optional(),
  }),
);

const decisionList_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("decisionList")]),
    attrs: z.strictObject({ localId: z.string() }),
    content: z.array(decisionItem_node).min(1),
  }),
);

const doc_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("doc")]),
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
    version: z.union([z.literal(1)]),
  }),
);

const em_mark = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("em")]) }),
);

const embedCard_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("embedCard")]),
    attrs: z.strictObject({
      url: z.string(),
      layout: z.union([
        z.literal("wide"),
        z.literal("full-width"),
        z.literal("center"),
        z.literal("wrap-right"),
        z.literal("wrap-left"),
        z.literal("align-end"),
        z.literal("align-start"),
      ]),
      width: z.number().max(100).optional(),
      originalHeight: z.number().optional(),
      originalWidth: z.number().optional(),
      localId: z.string().optional(),
    }),
  }),
);

const emoji_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("emoji")]),
    attrs: z.strictObject({
      shortName: z.string(),
      id: z.string().optional(),
      text: z.string().optional(),
      localId: z.string().optional(),
    }),
  }),
);

const expand_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("expand")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z
      .strictObject({
        title: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z
      .array(
        z.union([non_nestable_block_content, nestedExpand_with_no_marks_node]),
      )
      .min(1),
  }),
);

const expand_root_only_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("expand")]),
    marks: z.array(breakout_mark).optional(),
    attrs: z
      .strictObject({
        title: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z
      .array(
        z.union([non_nestable_block_content, nestedExpand_with_no_marks_node]),
      )
      .min(1),
  }),
);

const extension_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("extension")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      layout: z
        .union([
          z.literal("wide"),
          z.literal("full-width"),
          z.literal("default"),
        ])
        .optional(),
      localId: z.string().min(1).optional(),
    }),
  }),
);

const extension_with_marks_node = z.lazy(() =>
  z.intersection(
    extension_node,
    z.object({
      marks: z.array(z.union([dataConsumer_mark, fragment_mark])).optional(),
    }),
  ),
);

const formatted_text_inline_node = z.lazy(() =>
  z.intersection(
    text_node,
    z.object({
      marks: z
        .array(
          z.union([
            link_mark,
            em_mark,
            strong_mark,
            strike_mark,
            subsup_mark,
            underline_mark,
            textColor_mark,
            annotation_mark,
            backgroundColor_mark,
          ]),
        )
        .optional(),
    }),
  ),
);

const fragment_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("fragment")]),
    attrs: z.strictObject({
      localId: z.string().min(1),
      name: z.string().optional(),
    }),
  }),
);

const hardBreak_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("hardBreak")]),
    attrs: z
      .strictObject({
        text: z.union([z.literal("\n")]).optional(),
        localId: z.string().optional(),
      })
      .optional(),
  }),
);

const heading_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("heading")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      level: z.number().min(1).max(6),
      localId: z.string().optional(),
    }),
    content: z.array(inline_node).optional(),
  }),
);

const heading_with_alignment_node = z.lazy(() =>
  z.intersection(
    heading_node,
    z.object({ marks: z.array(alignment_mark).optional() }),
  ),
);

const heading_with_indentation_node = z.lazy(() =>
  z.intersection(
    heading_node,
    z.object({ marks: z.array(indentation_mark).optional() }),
  ),
);

const heading_with_no_marks_node = z.lazy(() =>
  z.intersection(
    heading_node,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const indentation_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("indentation")]),
    attrs: z.strictObject({ level: z.number().min(1).max(6) }),
  }),
);

const inline_node = z.lazy(() =>
  z.union([
    formatted_text_inline_node,
    code_inline_node,
    date_node,
    emoji_node,
    hardBreak_node,
    inlineCard_node,
    mention_node,
    placeholder_node,
    status_node,
    inlineExtension_with_marks_node,
    mediaInline_node,
  ]),
);

const inlineCard_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("inlineCard")]),
    attrs: z.union([
      z.strictObject({ url: z.string(), localId: z.string().optional() }),
      z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  }),
);

const inlineExtension_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("inlineExtension")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      localId: z.string().min(1).optional(),
    }),
  }),
);

const inlineExtension_with_marks_node = z.lazy(() =>
  z.intersection(
    inlineExtension_node,
    z.object({
      marks: z.array(z.union([dataConsumer_mark, fragment_mark])).optional(),
    }),
  ),
);

const layoutColumn_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("layoutColumn")]),
    attrs: z.strictObject({
      width: z.number().max(100),
      localId: z.string().optional(),
    }),
    content: z.array(block_content).min(1),
  }),
);

const layoutSection_full_node = z.lazy(() =>
  z.intersection(
    layoutSection_node,
    z.object({
      marks: z.array(breakout_mark).optional(),
      content: z.array(layoutColumn_node).min(2).max(3),
    }),
  ),
);

const layoutSection_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("layoutSection")]),
    marks: z.array(breakout_mark).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(layoutColumn_node),
  }),
);

const link_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("link")]),
    attrs: z.strictObject({
      href: z.string(),
      title: z.string().optional(),
      id: z.string().optional(),
      collection: z.string().optional(),
      occurrenceKey: z.string().optional(),
    }),
  }),
);

const listItem_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("listItem")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(z.unknown()).min(1),
  }),
);

const media_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("media")]),
    marks: z
      .array(z.union([link_mark, annotation_mark, border_mark]))
      .optional(),
    attrs: z.union([
      z.strictObject({
        type: z.union([z.literal("link"), z.literal("file")]),
        localId: z.string().optional(),
        id: z.string().min(1),
        alt: z.string().optional(),
        collection: z.string(),
        height: z.number().optional(),
        occurrenceKey: z.string().min(1).optional(),
        width: z.number().optional(),
      }),
      z.strictObject({
        type: z.union([z.literal("external")]),
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
  z.strictObject({
    type: z.union([z.literal("mediaGroup")]),
    content: z.array(media_node).min(1),
  }),
);

const mediaInline_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("mediaInline")]),
    marks: z
      .array(z.union([link_mark, annotation_mark, border_mark]))
      .optional(),
    attrs: z.strictObject({
      type: z
        .union([z.literal("link"), z.literal("file"), z.literal("image")])
        .optional(),
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

const mediaSingle_caption_node = z.lazy(() =>
  z.intersection(
    mediaSingle_node,
    z.object({ content: z.array(z.unknown()).min(1).max(2) }),
  ),
);

const mediaSingle_full_node = z.lazy(() =>
  z.intersection(
    mediaSingle_node,
    z.object({ content: z.array(media_node).min(1).max(1) }),
  ),
);

const mediaSingle_node = z.lazy(() =>
  z.object({
    type: z.union([z.literal("mediaSingle")]),
    marks: z.array(link_mark).optional(),
    attrs: z
      .union([
        z.strictObject({
          localId: z.string().optional(),
          width: z.number().max(100).optional(),
          layout: z.union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ]),
          widthType: z.union([z.literal("percentage")]).optional(),
        }),
        z.strictObject({
          localId: z.string().optional(),
          width: z.number(),
          widthType: z.union([z.literal("pixel")]),
          layout: z.union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ]),
        }),
      ])
      .optional(),
  }),
);

const mention_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("mention")]),
    attrs: z.strictObject({
      id: z.string(),
      localId: z.string().optional(),
      text: z.string().optional(),
      accessLevel: z.string().optional(),
      userType: z
        .union([z.literal("DEFAULT"), z.literal("SPECIAL"), z.literal("APP")])
        .optional(),
    }),
  }),
);

const nestedExpand_content = z.lazy(() =>
  z
    .array(
      z.union([
        paragraph_with_no_marks_node,
        heading_with_no_marks_node,
        mediaSingle_caption_node,
        mediaSingle_full_node,
        mediaGroup_node,
        codeBlock_node,
        bulletList_node,
        orderedList_node,
        taskList_node,
        decisionList_node,
        rule_node,
        panel_node,
        blockquote_node,
        extension_with_marks_node,
      ]),
    )
    .min(1),
);

const nestedExpand_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("nestedExpand")]),
    attrs: z.strictObject({
      title: z.string().optional(),
      localId: z.string().optional(),
    }),
    content: nestedExpand_content,
  }),
);

const nestedExpand_with_no_marks_node = z.lazy(() =>
  z.intersection(
    nestedExpand_node,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const non_nestable_block_content = z.lazy(() =>
  z.union([
    paragraph_with_no_marks_node,
    panel_node,
    blockquote_node,
    orderedList_node,
    bulletList_node,
    rule_node,
    heading_with_no_marks_node,
    codeBlock_node,
    mediaGroup_node,
    mediaSingle_caption_node,
    mediaSingle_full_node,
    decisionList_node,
    taskList_node,
    table_node,
    blockCard_node,
    embedCard_node,
    extension_with_marks_node,
  ]),
);

const orderedList_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("orderedList")]),
    attrs: z
      .strictObject({
        order: z.number().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(listItem_node).min(1),
  }),
);

const panel_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("panel")]),
    attrs: z.strictObject({
      panelType: z.union([
        z.literal("info"),
        z.literal("note"),
        z.literal("tip"),
        z.literal("warning"),
        z.literal("error"),
        z.literal("success"),
        z.literal("custom"),
      ]),
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
  z.strictObject({
    type: z.union([z.literal("paragraph")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(inline_node).optional(),
  }),
);

const paragraph_with_alignment_node = z.lazy(() =>
  z.intersection(
    paragraph_node,
    z.object({ marks: z.array(alignment_mark).optional() }),
  ),
);

const paragraph_with_indentation_node = z.lazy(() =>
  z.intersection(
    paragraph_node,
    z.object({ marks: z.array(indentation_mark).optional() }),
  ),
);

const paragraph_with_no_marks_node = z.lazy(() =>
  z.intersection(
    paragraph_node,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const placeholder_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("placeholder")]),
    attrs: z.strictObject({ text: z.string(), localId: z.string().optional() }),
  }),
);

const rule_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("rule")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
  }),
);

const status_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("status")]),
    attrs: z.strictObject({
      text: z.string().min(1),
      color: z.union([
        z.literal("neutral"),
        z.literal("purple"),
        z.literal("blue"),
        z.literal("red"),
        z.literal("yellow"),
        z.literal("green"),
      ]),
      localId: z.string().optional(),
      style: z.string().optional(),
    }),
  }),
);

const strike_mark = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strike")]) }),
);

const strong_mark = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strong")]) }),
);

const subsup_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("subsup")]),
    attrs: z.strictObject({
      type: z.union([z.literal("sub"), z.literal("sup")]),
    }),
  }),
);

const table_cell_content = z.lazy(() =>
  z
    .array(
      z.union([
        paragraph_with_no_marks_node,
        paragraph_with_alignment_node,
        panel_node,
        blockquote_node,
        orderedList_node,
        bulletList_node,
        rule_node,
        heading_with_no_marks_node,
        heading_with_alignment_node,
        heading_with_indentation_node,
        codeBlock_node,
        mediaSingle_caption_node,
        mediaSingle_full_node,
        mediaGroup_node,
        decisionList_node,
        taskList_node,
        blockCard_node,
        embedCard_node,
        extension_with_marks_node,
        nestedExpand_with_no_marks_node,
      ]),
    )
    .min(1),
);

const table_cell_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("tableCell")]),
    attrs: z
      .strictObject({
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
  z.strictObject({
    type: z.union([z.literal("tableHeader")]),
    attrs: z
      .strictObject({
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
  z.strictObject({
    type: z.union([z.literal("table")]),
    marks: z.array(fragment_mark).optional(),
    attrs: z
      .strictObject({
        displayMode: z
          .union([z.literal("default"), z.literal("fixed")])
          .optional(),
        isNumberColumnEnabled: z.boolean().optional(),
        layout: z
          .union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("align-end"),
            z.literal("align-start"),
            z.literal("default"),
          ])
          .optional(),
        localId: z.string().min(1).optional(),
        width: z.number().optional(),
      })
      .optional(),
    content: z.array(table_row_node).min(1),
  }),
);

const table_row_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("tableRow")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(z.union([table_cell_node, table_header_node])),
  }),
);

const taskItem_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskItem")]),
    attrs: z.strictObject({
      localId: z.string(),
      state: z.union([z.literal("TODO"), z.literal("DONE")]),
    }),
    content: z.array(inline_node).optional(),
  }),
);

const taskList_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskList")]),
    attrs: z.strictObject({ localId: z.string() }),
    content: z.array(z.unknown()).min(1),
  }),
);

const text_node = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("text")]),
    marks: z.array(z.unknown()).optional(),
    text: z.string().min(1),
  }),
);

const text_with_no_marks_node = z.lazy(() =>
  z.intersection(
    text_node,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const textColor_mark = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("textColor")]),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const underline_mark = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("underline")]) }),
);
