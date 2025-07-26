import { z } from "zod";

import * as T from "./types";

export const AlignmentMarkSchema: z.ZodType<T.AlignmentMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("alignment")]),
    attrs: z.strictObject({
      align: z.union([z.literal("center"), z.literal("end")]),
    }),
  }),
);

export const AnnotationMarkSchema: z.ZodType<T.AnnotationMarkType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("annotation")]),
      attrs: z.strictObject({
        id: z.string(),
        annotationType: z.union([z.literal("inlineComment")]),
      }),
    }),
);

export const BackgroundColorMarkSchema: z.ZodType<T.BackgroundColorMarkType> =
  z.lazy(() =>
    z.strictObject({
      type: z.union([z.literal("backgroundColor")]),
      attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
    }),
  );

export const BlockContentSchema: z.ZodType<T.BlockContentType> = z.lazy(() =>
  z.union([
    BlockCardNodeSchema,
    ParagraphWithNoMarksNodeSchema,
    ParagraphWithAlignmentNodeSchema,
    ParagraphWithIndentationNodeSchema,
    MediaSingleCaptionNodeSchema,
    MediaSingleFullNodeSchema,
    CodeBlockNodeSchema,
    TaskListNodeSchema,
    BulletListNodeSchema,
    OrderedListNodeSchema,
    HeadingWithNoMarksNodeSchema,
    HeadingWithAlignmentNodeSchema,
    HeadingWithIndentationNodeSchema,
    MediaGroupNodeSchema,
    DecisionListNodeSchema,
    RuleNodeSchema,
    PanelNodeSchema,
    BlockquoteNodeSchema,
    ExtensionWithMarksNodeSchema,
    EmbedCardNodeSchema,
    TableNodeSchema,
    ExpandNodeSchema,
    BodiedExtensionWithMarksNodeSchema,
  ]),
);

export const BlockCardNodeSchema: z.ZodType<T.BlockCardNodeType> = z.lazy(() =>
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

export const BlockquoteNodeSchema: z.ZodType<T.BlockquoteNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("blockquote")]),
      attrs: z.strictObject({ localId: z.string().optional() }).optional(),
      content: z
        .array(
          z.union([
            ParagraphWithNoMarksNodeSchema,
            OrderedListNodeSchema,
            BulletListNodeSchema,
            CodeBlockNodeSchema,
            MediaSingleCaptionNodeSchema,
            MediaSingleFullNodeSchema,
            MediaGroupNodeSchema,
            ExtensionWithMarksNodeSchema,
          ]),
        )
        .min(1),
    }),
);

export const BodiedExtensionNodeSchema: z.ZodType<T.BodiedExtensionNodeType> =
  z.lazy(() =>
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
      content: z.array(NonNestableBlockContentSchema).min(1),
    }),
  );

export const BodiedExtensionWithMarksNodeSchema: z.ZodType<T.BodiedExtensionWithMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      BodiedExtensionNodeSchema,
      z.object({
        marks: z
          .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
          .optional(),
      }),
    ),
  );

export const BorderMarkSchema: z.ZodType<T.BorderMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("border")]),
    attrs: z.strictObject({
      size: z.number().min(1).max(3),
      color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
    }),
  }),
);

export const BreakoutMarkSchema: z.ZodType<T.BreakoutMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("breakout")]),
    attrs: z.strictObject({
      mode: z.union([z.literal("wide"), z.literal("full-width")]),
      width: z.number().optional(),
    }),
  }),
);

export const BulletListNodeSchema: z.ZodType<T.BulletListNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("bulletList")]),
      attrs: z.strictObject({ localId: z.string().optional() }).optional(),
      content: z.array(ListItemNodeSchema).min(1),
    }),
);

export const CaptionNodeSchema: z.ZodType<T.CaptionNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("caption")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.union([
          HardBreakNodeSchema,
          MentionNodeSchema,
          EmojiNodeSchema,
          DateNodeSchema,
          PlaceholderNodeSchema,
          InlineCardNodeSchema,
          StatusNodeSchema,
          FormattedTextInlineNodeSchema,
          CodeInlineNodeSchema,
        ]),
      )
      .optional(),
  }),
);

export const CodeInlineNodeSchema: z.ZodType<T.CodeInlineNodeType> = z.lazy(
  () =>
    z.intersection(
      TextNodeSchema,
      z.object({
        marks: z
          .array(
            z.union([CodeMarkSchema, LinkMarkSchema, AnnotationMarkSchema]),
          )
          .optional(),
      }),
    ),
);

export const CodeMarkSchema: z.ZodType<T.CodeMarkType> = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("code")]) }),
);

export const CodeBlockNodeSchema: z.ZodType<T.CodeBlockNodeType> = z.lazy(() =>
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
    content: z.array(TextWithNoMarksNodeSchema).optional(),
  }),
);

export const CodeBlockRootOnlyNodeSchema: z.ZodType<T.CodeBlockRootOnlyNodeType> =
  z.lazy(() =>
    z.strictObject({
      type: z.union([z.literal("codeBlock")]),
      marks: z.array(BreakoutMarkSchema).optional(),
      attrs: z
        .strictObject({
          language: z.string().optional(),
          uniqueId: z.string().optional(),
          localId: z.string().optional(),
        })
        .optional(),
      content: z.array(TextWithNoMarksNodeSchema).optional(),
    }),
  );

export const DataConsumerMarkSchema: z.ZodType<T.DataConsumerMarkType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("dataConsumer")]),
      attrs: z.strictObject({ sources: z.array(z.string()).min(1) }),
    }),
);

export const DateNodeSchema: z.ZodType<T.DateNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("date")]),
    attrs: z.strictObject({
      timestamp: z.string().min(1),
      localId: z.string().optional(),
    }),
  }),
);

export const DecisionItemNodeSchema: z.ZodType<T.DecisionItemNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("decisionItem")]),
      attrs: z.strictObject({ localId: z.string(), state: z.string() }),
      content: z.array(InlineNodeSchema).optional(),
    }),
);

export const DecisionListNodeSchema: z.ZodType<T.DecisionListNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("decisionList")]),
      attrs: z.strictObject({ localId: z.string() }),
      content: z.array(DecisionItemNodeSchema).min(1),
    }),
);

export const DocNodeSchema: z.ZodType<T.DocNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("doc")]),
    content: z.array(
      z.union([
        BlockCardNodeSchema,
        CodeBlockNodeSchema,
        MediaSingleCaptionNodeSchema,
        MediaSingleFullNodeSchema,
        ParagraphWithAlignmentNodeSchema,
        ParagraphWithIndentationNodeSchema,
        ParagraphWithNoMarksNodeSchema,
        TaskListNodeSchema,
        OrderedListNodeSchema,
        BulletListNodeSchema,
        BlockquoteNodeSchema,
        DecisionListNodeSchema,
        EmbedCardNodeSchema,
        ExtensionWithMarksNodeSchema,
        HeadingWithIndentationNodeSchema,
        HeadingWithNoMarksNodeSchema,
        HeadingWithAlignmentNodeSchema,
        MediaGroupNodeSchema,
        RuleNodeSchema,
        PanelNodeSchema,
        TableNodeSchema,
        BodiedExtensionWithMarksNodeSchema,
        ExpandNodeSchema,
        CodeBlockRootOnlyNodeSchema,
        LayoutSectionFullNodeSchema,
        ExpandRootOnlyNodeSchema,
      ]),
    ),
    version: z.union([z.literal(1)]),
  }),
);

export const EmMarkSchema: z.ZodType<T.EmMarkType> = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("em")]) }),
);

export const EmbedCardNodeSchema: z.ZodType<T.EmbedCardNodeType> = z.lazy(() =>
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

export const EmojiNodeSchema: z.ZodType<T.EmojiNodeType> = z.lazy(() =>
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

export const ExpandNodeSchema: z.ZodType<T.ExpandNodeType> = z.lazy(() =>
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
        z.union([
          NonNestableBlockContentSchema,
          NestedExpandWithNoMarksNodeSchema,
        ]),
      )
      .min(1),
  }),
);

export const ExpandRootOnlyNodeSchema: z.ZodType<T.ExpandRootOnlyNodeType> =
  z.lazy(() =>
    z.strictObject({
      type: z.union([z.literal("expand")]),
      marks: z.array(BreakoutMarkSchema).optional(),
      attrs: z
        .strictObject({
          title: z.string().optional(),
          localId: z.string().optional(),
        })
        .optional(),
      content: z
        .array(
          z.union([
            NonNestableBlockContentSchema,
            NestedExpandWithNoMarksNodeSchema,
          ]),
        )
        .min(1),
    }),
  );

export const ExtensionNodeSchema: z.ZodType<T.ExtensionNodeType> = z.lazy(() =>
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

export const ExtensionWithMarksNodeSchema: z.ZodType<T.ExtensionWithMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      ExtensionNodeSchema,
      z.object({
        marks: z
          .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
          .optional(),
      }),
    ),
  );

export const FormattedTextInlineNodeSchema: z.ZodType<T.FormattedTextInlineNodeType> =
  z.lazy(() =>
    z.intersection(
      TextNodeSchema,
      z.object({
        marks: z
          .array(
            z.union([
              LinkMarkSchema,
              EmMarkSchema,
              StrongMarkSchema,
              StrikeMarkSchema,
              SubsupMarkSchema,
              UnderlineMarkSchema,
              TextColorMarkSchema,
              AnnotationMarkSchema,
              BackgroundColorMarkSchema,
            ]),
          )
          .optional(),
      }),
    ),
  );

export const FragmentMarkSchema: z.ZodType<T.FragmentMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("fragment")]),
    attrs: z.strictObject({
      localId: z.string().min(1),
      name: z.string().optional(),
    }),
  }),
);

export const HardBreakNodeSchema: z.ZodType<T.HardBreakNodeType> = z.lazy(() =>
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

export const HeadingNodeSchema: z.ZodType<T.HeadingNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("heading")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      level: z.number().min(1).max(6),
      localId: z.string().optional(),
    }),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

export const HeadingWithAlignmentNodeSchema: z.ZodType<T.HeadingWithAlignmentNodeType> =
  z.lazy(() =>
    z.intersection(
      HeadingNodeSchema,
      z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
    ),
  );

export const HeadingWithIndentationNodeSchema: z.ZodType<T.HeadingWithIndentationNodeType> =
  z.lazy(() =>
    z.intersection(
      HeadingNodeSchema,
      z.object({ marks: z.array(IndentationMarkSchema).optional() }),
    ),
  );

export const HeadingWithNoMarksNodeSchema: z.ZodType<T.HeadingWithNoMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      HeadingNodeSchema,
      z.object({ marks: z.array(z.unknown()).optional() }),
    ),
  );

export const IndentationMarkSchema: z.ZodType<T.IndentationMarkType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("indentation")]),
      attrs: z.strictObject({ level: z.number().min(1).max(6) }),
    }),
);

export const InlineNodeSchema: z.ZodType<T.InlineNodeType> = z.lazy(() =>
  z.union([
    FormattedTextInlineNodeSchema,
    CodeInlineNodeSchema,
    DateNodeSchema,
    EmojiNodeSchema,
    HardBreakNodeSchema,
    InlineCardNodeSchema,
    MentionNodeSchema,
    PlaceholderNodeSchema,
    StatusNodeSchema,
    InlineExtensionWithMarksNodeSchema,
    MediaInlineNodeSchema,
  ]),
);

export const InlineCardNodeSchema: z.ZodType<T.InlineCardNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("inlineCard")]),
      attrs: z.union([
        z.strictObject({ url: z.string(), localId: z.string().optional() }),
        z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
      ]),
    }),
);

export const InlineExtensionNodeSchema: z.ZodType<T.InlineExtensionNodeType> =
  z.lazy(() =>
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

export const InlineExtensionWithMarksNodeSchema: z.ZodType<T.InlineExtensionWithMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      InlineExtensionNodeSchema,
      z.object({
        marks: z
          .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
          .optional(),
      }),
    ),
  );

export const LayoutColumnNodeSchema: z.ZodType<T.LayoutColumnNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("layoutColumn")]),
      attrs: z.strictObject({
        width: z.number().max(100),
        localId: z.string().optional(),
      }),
      content: z.array(BlockContentSchema).min(1),
    }),
);

export const LayoutSectionFullNodeSchema: z.ZodType<T.LayoutSectionFullNodeType> =
  z.lazy(() =>
    z.intersection(
      LayoutSectionNodeSchema,
      z.object({
        marks: z.array(BreakoutMarkSchema).optional(),
        content: z.array(LayoutColumnNodeSchema).min(2).max(3),
      }),
    ),
  );

export const LayoutSectionNodeSchema: z.ZodType<T.LayoutSectionNodeType> =
  z.lazy(() =>
    z.strictObject({
      type: z.union([z.literal("layoutSection")]),
      marks: z.array(BreakoutMarkSchema).optional(),
      attrs: z.strictObject({ localId: z.string().optional() }).optional(),
      content: z.array(LayoutColumnNodeSchema),
    }),
  );

export const LinkMarkSchema: z.ZodType<T.LinkMarkType> = z.lazy(() =>
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

export const ListItemNodeSchema: z.ZodType<T.ListItemNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("listItem")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.tuple([
          z.union([
            ParagraphWithNoMarksNodeSchema,
            MediaSingleCaptionNodeSchema,
            MediaSingleFullNodeSchema,
            CodeBlockNodeSchema,
            ExtensionWithMarksNodeSchema,
          ]),
          z.union([
            ParagraphWithNoMarksNodeSchema,
            BulletListNodeSchema,
            OrderedListNodeSchema,
            TaskListNodeSchema,
            MediaSingleCaptionNodeSchema,
            MediaSingleFullNodeSchema,
            CodeBlockNodeSchema,
            ExtensionWithMarksNodeSchema,
          ]),
        ]),
      )
      .min(1),
  }),
);

export const MediaNodeSchema: z.ZodType<T.MediaNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("media")]),
    marks: z
      .array(z.union([LinkMarkSchema, AnnotationMarkSchema, BorderMarkSchema]))
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

export const MediaGroupNodeSchema: z.ZodType<T.MediaGroupNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("mediaGroup")]),
      content: z.array(MediaNodeSchema).min(1),
    }),
);

export const MediaInlineNodeSchema: z.ZodType<T.MediaInlineNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("mediaInline")]),
      marks: z
        .array(
          z.union([LinkMarkSchema, AnnotationMarkSchema, BorderMarkSchema]),
        )
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

export const MediaSingleCaptionNodeSchema: z.ZodType<T.MediaSingleCaptionNodeType> =
  z.lazy(() =>
    z.intersection(
      MediaSingleNodeSchema,
      z.object({
        content: z
          .array(z.tuple([MediaNodeSchema, CaptionNodeSchema]))
          .min(1)
          .max(2),
      }),
    ),
  );

export const MediaSingleFullNodeSchema: z.ZodType<T.MediaSingleFullNodeType> =
  z.lazy(() =>
    z.intersection(
      MediaSingleNodeSchema,
      z.object({ content: z.array(MediaNodeSchema).min(1).max(1) }),
    ),
  );

export const MediaSingleNodeSchema: z.ZodType<T.MediaSingleNodeType> = z.lazy(
  () =>
    z.object({
      type: z.union([z.literal("mediaSingle")]),
      marks: z.array(LinkMarkSchema).optional(),
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

export const MentionNodeSchema: z.ZodType<T.MentionNodeType> = z.lazy(() =>
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

export const NestedExpandContentSchema: z.ZodType<T.NestedExpandContentType> =
  z.lazy(() =>
    z
      .array(
        z.union([
          ParagraphWithNoMarksNodeSchema,
          HeadingWithNoMarksNodeSchema,
          MediaSingleCaptionNodeSchema,
          MediaSingleFullNodeSchema,
          MediaGroupNodeSchema,
          CodeBlockNodeSchema,
          BulletListNodeSchema,
          OrderedListNodeSchema,
          TaskListNodeSchema,
          DecisionListNodeSchema,
          RuleNodeSchema,
          PanelNodeSchema,
          BlockquoteNodeSchema,
          ExtensionWithMarksNodeSchema,
        ]),
      )
      .min(1),
  );

export const NestedExpandNodeSchema: z.ZodType<T.NestedExpandNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("nestedExpand")]),
      attrs: z.strictObject({
        title: z.string().optional(),
        localId: z.string().optional(),
      }),
      content: NestedExpandContentSchema,
    }),
);

export const NestedExpandWithNoMarksNodeSchema: z.ZodType<T.NestedExpandWithNoMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      NestedExpandNodeSchema,
      z.object({ marks: z.array(z.unknown()).optional() }),
    ),
  );

export const NonNestableBlockContentSchema: z.ZodType<T.NonNestableBlockContentType> =
  z.lazy(() =>
    z.union([
      ParagraphWithNoMarksNodeSchema,
      PanelNodeSchema,
      BlockquoteNodeSchema,
      OrderedListNodeSchema,
      BulletListNodeSchema,
      RuleNodeSchema,
      HeadingWithNoMarksNodeSchema,
      CodeBlockNodeSchema,
      MediaGroupNodeSchema,
      MediaSingleCaptionNodeSchema,
      MediaSingleFullNodeSchema,
      DecisionListNodeSchema,
      TaskListNodeSchema,
      TableNodeSchema,
      BlockCardNodeSchema,
      EmbedCardNodeSchema,
      ExtensionWithMarksNodeSchema,
    ]),
  );

export const OrderedListNodeSchema: z.ZodType<T.OrderedListNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("orderedList")]),
      attrs: z
        .strictObject({
          order: z.number().optional(),
          localId: z.string().optional(),
        })
        .optional(),
      content: z.array(ListItemNodeSchema).min(1),
    }),
);

export const PanelNodeSchema: z.ZodType<T.PanelNodeType> = z.lazy(() =>
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
          ParagraphWithNoMarksNodeSchema,
          HeadingWithNoMarksNodeSchema,
          BulletListNodeSchema,
          OrderedListNodeSchema,
          BlockCardNodeSchema,
          MediaGroupNodeSchema,
          MediaSingleCaptionNodeSchema,
          MediaSingleFullNodeSchema,
          CodeBlockNodeSchema,
          TaskListNodeSchema,
          RuleNodeSchema,
          DecisionListNodeSchema,
          ExtensionWithMarksNodeSchema,
        ]),
      )
      .min(1),
  }),
);

export const ParagraphNodeSchema: z.ZodType<T.ParagraphNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("paragraph")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

export const ParagraphWithAlignmentNodeSchema: z.ZodType<T.ParagraphWithAlignmentNodeType> =
  z.lazy(() =>
    z.intersection(
      ParagraphNodeSchema,
      z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
    ),
  );

export const ParagraphWithIndentationNodeSchema: z.ZodType<T.ParagraphWithIndentationNodeType> =
  z.lazy(() =>
    z.intersection(
      ParagraphNodeSchema,
      z.object({ marks: z.array(IndentationMarkSchema).optional() }),
    ),
  );

export const ParagraphWithNoMarksNodeSchema: z.ZodType<T.ParagraphWithNoMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      ParagraphNodeSchema,
      z.object({ marks: z.array(z.unknown()).optional() }),
    ),
  );

export const PlaceholderNodeSchema: z.ZodType<T.PlaceholderNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.union([z.literal("placeholder")]),
      attrs: z.strictObject({
        text: z.string(),
        localId: z.string().optional(),
      }),
    }),
);

export const RuleNodeSchema: z.ZodType<T.RuleNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("rule")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
  }),
);

export const StatusNodeSchema: z.ZodType<T.StatusNodeType> = z.lazy(() =>
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

export const StrikeMarkSchema: z.ZodType<T.StrikeMarkType> = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strike")]) }),
);

export const StrongMarkSchema: z.ZodType<T.StrongMarkType> = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strong")]) }),
);

export const SubsupMarkSchema: z.ZodType<T.SubsupMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("subsup")]),
    attrs: z.strictObject({
      type: z.union([z.literal("sub"), z.literal("sup")]),
    }),
  }),
);

export const TableCellContentSchema: z.ZodType<T.TableCellContentType> = z.lazy(
  () =>
    z
      .array(
        z.union([
          ParagraphWithNoMarksNodeSchema,
          ParagraphWithAlignmentNodeSchema,
          PanelNodeSchema,
          BlockquoteNodeSchema,
          OrderedListNodeSchema,
          BulletListNodeSchema,
          RuleNodeSchema,
          HeadingWithNoMarksNodeSchema,
          HeadingWithAlignmentNodeSchema,
          HeadingWithIndentationNodeSchema,
          CodeBlockNodeSchema,
          MediaSingleCaptionNodeSchema,
          MediaSingleFullNodeSchema,
          MediaGroupNodeSchema,
          DecisionListNodeSchema,
          TaskListNodeSchema,
          BlockCardNodeSchema,
          EmbedCardNodeSchema,
          ExtensionWithMarksNodeSchema,
          NestedExpandWithNoMarksNodeSchema,
        ]),
      )
      .min(1),
);

export const TableCellNodeSchema: z.ZodType<T.TableCellNodeType> = z.lazy(() =>
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
    content: TableCellContentSchema,
  }),
);

export const TableHeaderNodeSchema: z.ZodType<T.TableHeaderNodeType> = z.lazy(
  () =>
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
      content: TableCellContentSchema,
    }),
);

export const TableNodeSchema: z.ZodType<T.TableNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("table")]),
    marks: z.array(FragmentMarkSchema).optional(),
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
    content: z.array(TableRowNodeSchema).min(1),
  }),
);

export const TableRowNodeSchema: z.ZodType<T.TableRowNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("tableRow")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(z.union([TableCellNodeSchema, TableHeaderNodeSchema])),
  }),
);

export const TaskItemNodeSchema: z.ZodType<T.TaskItemNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskItem")]),
    attrs: z.strictObject({
      localId: z.string(),
      state: z.union([z.literal("TODO"), z.literal("DONE")]),
    }),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

export const TaskListNodeSchema: z.ZodType<T.TaskListNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskList")]),
    attrs: z.strictObject({ localId: z.string() }),
    content: z
      .array(
        z.tuple([
          TaskItemNodeSchema,
          z.union([TaskItemNodeSchema, TaskListNodeSchema]),
        ]),
      )
      .min(1),
  }),
);

export const TextNodeSchema: z.ZodType<T.TextNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("text")]),
    marks: z.array(z.unknown()).optional(),
    text: z.string().min(1),
  }),
);

export const TextWithNoMarksNodeSchema: z.ZodType<T.TextWithNoMarksNodeType> =
  z.lazy(() =>
    z.intersection(
      TextNodeSchema,
      z.object({ marks: z.array(z.unknown()).optional() }),
    ),
  );

export const TextColorMarkSchema: z.ZodType<T.TextColorMarkType> = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("textColor")]),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

export const UnderlineMarkSchema: z.ZodType<T.UnderlineMarkType> = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("underline")]) }),
);
