import { z } from "zod";

const AlignmentMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("alignment")]),
    attrs: z.strictObject({
      align: z.union([z.literal("center"), z.literal("end")]),
    }),
  }),
);

const AnnotationMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("annotation")]),
    attrs: z.strictObject({
      id: z.string(),
      annotationType: z.union([z.literal("inlineComment")]),
    }),
  }),
);

const BackgroundColorMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("backgroundColor")]),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const BlockContentSchema = z.lazy(() =>
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

const BlockCardNodeSchema = z.lazy(() =>
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

const BlockquoteNodeSchema = z.lazy(() =>
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

const BodiedExtensionNodeSchema = z.lazy(() =>
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

const BodiedExtensionWithMarksNodeSchema = z.lazy(() =>
  z.intersection(
    BodiedExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  ),
);

const BorderMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("border")]),
    attrs: z.strictObject({
      size: z.number().min(1).max(3),
      color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
    }),
  }),
);

const BreakoutMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("breakout")]),
    attrs: z.strictObject({
      mode: z.union([z.literal("wide"), z.literal("full-width")]),
      width: z.number().optional(),
    }),
  }),
);

const BulletListNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("bulletList")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(ListItemNodeSchema).min(1),
  }),
);

const CaptionNodeSchema = z.lazy(() =>
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

const CodeInlineNodeSchema = z.lazy(() =>
  z.intersection(
    TextNodeSchema,
    z.object({
      marks: z
        .array(z.union([CodeMarkSchema, LinkMarkSchema, AnnotationMarkSchema]))
        .optional(),
    }),
  ),
);

const CodeMarkSchema = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("code")]) }),
);

const CodeBlockNodeSchema = z.lazy(() =>
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

const CodeBlockRootOnlyNodeSchema = z.lazy(() =>
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

const DataConsumerMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("dataConsumer")]),
    attrs: z.strictObject({ sources: z.array(z.string()).min(1) }),
  }),
);

const DateNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("date")]),
    attrs: z.strictObject({
      timestamp: z.string().min(1),
      localId: z.string().optional(),
    }),
  }),
);

const DecisionItemNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("decisionItem")]),
    attrs: z.strictObject({ localId: z.string(), state: z.string() }),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

const DecisionListNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("decisionList")]),
    attrs: z.strictObject({ localId: z.string() }),
    content: z.array(DecisionItemNodeSchema).min(1),
  }),
);

const DocNodeSchema = z.lazy(() =>
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

const EmMarkSchema = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("em")]) }),
);

const EmbedCardNodeSchema = z.lazy(() =>
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

const EmojiNodeSchema = z.lazy(() =>
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

const ExpandNodeSchema = z.lazy(() =>
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

const ExpandRootOnlyNodeSchema = z.lazy(() =>
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

const ExtensionNodeSchema = z.lazy(() =>
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

const ExtensionWithMarksNodeSchema = z.lazy(() =>
  z.intersection(
    ExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  ),
);

const FormattedTextInlineNodeSchema = z.lazy(() =>
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

const FragmentMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("fragment")]),
    attrs: z.strictObject({
      localId: z.string().min(1),
      name: z.string().optional(),
    }),
  }),
);

const HardBreakNodeSchema = z.lazy(() =>
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

const HeadingNodeSchema = z.lazy(() =>
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

const HeadingWithAlignmentNodeSchema = z.lazy(() =>
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
  ),
);

const HeadingWithIndentationNodeSchema = z.lazy(() =>
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(IndentationMarkSchema).optional() }),
  ),
);

const HeadingWithNoMarksNodeSchema = z.lazy(() =>
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const IndentationMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("indentation")]),
    attrs: z.strictObject({ level: z.number().min(1).max(6) }),
  }),
);

const InlineNodeSchema = z.lazy(() =>
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

const InlineCardNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("inlineCard")]),
    attrs: z.union([
      z.strictObject({ url: z.string(), localId: z.string().optional() }),
      z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  }),
);

const InlineExtensionNodeSchema = z.lazy(() =>
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

const InlineExtensionWithMarksNodeSchema = z.lazy(() =>
  z.intersection(
    InlineExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  ),
);

const LayoutColumnNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("layoutColumn")]),
    attrs: z.strictObject({
      width: z.number().max(100),
      localId: z.string().optional(),
    }),
    content: z.array(BlockContentSchema).min(1),
  }),
);

const LayoutSectionFullNodeSchema = z.lazy(() =>
  z.intersection(
    LayoutSectionNodeSchema,
    z.object({
      marks: z.array(BreakoutMarkSchema).optional(),
      content: z.array(LayoutColumnNodeSchema).min(2).max(3),
    }),
  ),
);

const LayoutSectionNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("layoutSection")]),
    marks: z.array(BreakoutMarkSchema).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(LayoutColumnNodeSchema),
  }),
);

const LinkMarkSchema = z.lazy(() =>
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

const ListItemNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("listItem")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.lazy(() =>
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
        ),
      )
      .min(1),
  }),
);

const MediaNodeSchema = z.lazy(() =>
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

const MediaGroupNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("mediaGroup")]),
    content: z.array(MediaNodeSchema).min(1),
  }),
);

const MediaInlineNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("mediaInline")]),
    marks: z
      .array(z.union([LinkMarkSchema, AnnotationMarkSchema, BorderMarkSchema]))
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

const MediaSingleCaptionNodeSchema = z.lazy(() =>
  z.intersection(
    MediaSingleNodeSchema,
    z.object({
      content: z
        .array(z.lazy(() => z.tuple([MediaNodeSchema, CaptionNodeSchema])))
        .min(1)
        .max(2),
    }),
  ),
);

const MediaSingleFullNodeSchema = z.lazy(() =>
  z.intersection(
    MediaSingleNodeSchema,
    z.object({ content: z.array(MediaNodeSchema).min(1).max(1) }),
  ),
);

const MediaSingleNodeSchema = z.lazy(() =>
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

const MentionNodeSchema = z.lazy(() =>
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

const NestedExpandContentSchema = z.lazy(() =>
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

const NestedExpandNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("nestedExpand")]),
    attrs: z.strictObject({
      title: z.string().optional(),
      localId: z.string().optional(),
    }),
    content: NestedExpandContentSchema,
  }),
);

const NestedExpandWithNoMarksNodeSchema = z.lazy(() =>
  z.intersection(
    NestedExpandNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const NonNestableBlockContentSchema = z.lazy(() =>
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

const OrderedListNodeSchema = z.lazy(() =>
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

const PanelNodeSchema = z.lazy(() =>
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

const ParagraphNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("paragraph")]),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

const ParagraphWithAlignmentNodeSchema = z.lazy(() =>
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
  ),
);

const ParagraphWithIndentationNodeSchema = z.lazy(() =>
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(IndentationMarkSchema).optional() }),
  ),
);

const ParagraphWithNoMarksNodeSchema = z.lazy(() =>
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const PlaceholderNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("placeholder")]),
    attrs: z.strictObject({ text: z.string(), localId: z.string().optional() }),
  }),
);

const RuleNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("rule")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
  }),
);

const StatusNodeSchema = z.lazy(() =>
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

const StrikeMarkSchema = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strike")]) }),
);

const StrongMarkSchema = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("strong")]) }),
);

const SubsupMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("subsup")]),
    attrs: z.strictObject({
      type: z.union([z.literal("sub"), z.literal("sup")]),
    }),
  }),
);

const TableCellContentSchema = z.lazy(() =>
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

const TableCellNodeSchema = z.lazy(() =>
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

const TableHeaderNodeSchema = z.lazy(() =>
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

const TableNodeSchema = z.lazy(() =>
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

const TableRowNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("tableRow")]),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(z.union([TableCellNodeSchema, TableHeaderNodeSchema])),
  }),
);

const TaskItemNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskItem")]),
    attrs: z.strictObject({
      localId: z.string(),
      state: z.union([z.literal("TODO"), z.literal("DONE")]),
    }),
    content: z.array(InlineNodeSchema).optional(),
  }),
);

const TaskListNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("taskList")]),
    attrs: z.strictObject({ localId: z.string() }),
    content: z
      .array(
        z.lazy(() =>
          z.tuple([
            TaskItemNodeSchema,
            z.union([TaskItemNodeSchema, TaskListNodeSchema]),
          ]),
        ),
      )
      .min(1),
  }),
);

const TextNodeSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("text")]),
    marks: z.array(z.unknown()).optional(),
    text: z.string().min(1),
  }),
);

const TextWithNoMarksNodeSchema = z.lazy(() =>
  z.intersection(
    TextNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  ),
);

const TextColorMarkSchema = z.lazy(() =>
  z.strictObject({
    type: z.union([z.literal("textColor")]),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  }),
);

const UnderlineMarkSchema = z.lazy(() =>
  z.strictObject({ type: z.union([z.literal("underline")]) }),
);
