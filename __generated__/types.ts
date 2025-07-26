export type AlignmentMarkType = {
  type: "alignment";
  attrs: { align: "center" | "end" };
};

export type AnnotationMarkType = {
  type: "annotation";
  attrs: { id: string; annotationType: "inlineComment" };
};

export type BackgroundColorMarkType = {
  type: "backgroundColor";
  attrs: { color: string };
};

export type BlockContentType =
  | BlockCardNodeType
  | ParagraphWithNoMarksNodeType
  | ParagraphWithAlignmentNodeType
  | ParagraphWithIndentationNodeType
  | MediaSingleCaptionNodeType
  | MediaSingleFullNodeType
  | CodeBlockNodeType
  | TaskListNodeType
  | BulletListNodeType
  | OrderedListNodeType
  | HeadingWithNoMarksNodeType
  | HeadingWithAlignmentNodeType
  | HeadingWithIndentationNodeType
  | MediaGroupNodeType
  | DecisionListNodeType
  | RuleNodeType
  | PanelNodeType
  | BlockquoteNodeType
  | ExtensionWithMarksNodeType
  | EmbedCardNodeType
  | TableNodeType
  | ExpandNodeType
  | BodiedExtensionWithMarksNodeType;

export type BlockCardNodeType = {
  type: "blockCard";
  attrs:
    | {
        localId?: string;
        url?: string;
        datasource: {
          id: string;
          parameters: unknown;
          views: { properties?: unknown; type: string }[];
        };
        width?: number;
        layout?:
          | "wide"
          | "full-width"
          | "center"
          | "wrap-right"
          | "wrap-left"
          | "align-end"
          | "align-start";
      }
    | { url: string; localId?: string }
    | { data: unknown; localId?: string };
};

export type BlockquoteNodeType = {
  type: "blockquote";
  attrs?: { localId?: string };
  content: (
    | ParagraphWithNoMarksNodeType
    | OrderedListNodeType
    | BulletListNodeType
    | CodeBlockNodeType
    | MediaSingleCaptionNodeType
    | MediaSingleFullNodeType
    | MediaGroupNodeType
    | ExtensionWithMarksNodeType
  )[];
};

export type BodiedExtensionNodeType = {
  type: "bodiedExtension";
  marks?: unknown[];
  attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: unknown;
    text?: string;
    layout?: "wide" | "full-width" | "default";
    localId?: string;
  };
  content: NonNestableBlockContentType[];
};

export type BodiedExtensionWithMarksNodeType = BodiedExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

export type BorderMarkType = {
  type: "border";
  attrs: { size: number; color: string };
};

export type BreakoutMarkType = {
  type: "breakout";
  attrs: { mode: "wide" | "full-width"; width?: number };
};

export type BulletListNodeType = {
  type: "bulletList";
  attrs?: { localId?: string };
  content: ListItemNodeType[];
};

export type CaptionNodeType = {
  type: "caption";
  attrs?: { localId?: string };
  content?: (
    | HardBreakNodeType
    | MentionNodeType
    | EmojiNodeType
    | DateNodeType
    | PlaceholderNodeType
    | InlineCardNodeType
    | StatusNodeType
    | FormattedTextInlineNodeType
    | CodeInlineNodeType
  )[];
};

export type CodeInlineNodeType = TextNodeType & {
  marks?: (CodeMarkType | LinkMarkType | AnnotationMarkType)[];
  [key: string]: unknown;
};

export type CodeMarkType = { type: "code" };

export type CodeBlockNodeType = {
  type: "codeBlock";
  marks?: unknown[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: TextWithNoMarksNodeType[];
};

export type CodeBlockRootOnlyNodeType = {
  type: "codeBlock";
  marks?: BreakoutMarkType[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: TextWithNoMarksNodeType[];
};

export type DataConsumerMarkType = {
  type: "dataConsumer";
  attrs: { sources: string[] };
};

export type DateNodeType = {
  type: "date";
  attrs: { timestamp: string; localId?: string };
};

export type DecisionItemNodeType = {
  type: "decisionItem";
  attrs: { localId: string; state: string };
  content?: InlineNodeType[];
};

export type DecisionListNodeType = {
  type: "decisionList";
  attrs: { localId: string };
  content: DecisionItemNodeType[];
};

export type DocNodeType = {
  type: "doc";
  content: (
    | BlockCardNodeType
    | CodeBlockNodeType
    | MediaSingleCaptionNodeType
    | MediaSingleFullNodeType
    | ParagraphWithAlignmentNodeType
    | ParagraphWithIndentationNodeType
    | ParagraphWithNoMarksNodeType
    | TaskListNodeType
    | OrderedListNodeType
    | BulletListNodeType
    | BlockquoteNodeType
    | DecisionListNodeType
    | EmbedCardNodeType
    | ExtensionWithMarksNodeType
    | HeadingWithIndentationNodeType
    | HeadingWithNoMarksNodeType
    | HeadingWithAlignmentNodeType
    | MediaGroupNodeType
    | RuleNodeType
    | PanelNodeType
    | TableNodeType
    | BodiedExtensionWithMarksNodeType
    | ExpandNodeType
    | CodeBlockRootOnlyNodeType
    | LayoutSectionFullNodeType
    | ExpandRootOnlyNodeType
  )[];
  version: 1;
};

export type EmMarkType = { type: "em" };

export type EmbedCardNodeType = {
  type: "embedCard";
  attrs: {
    url: string;
    layout:
      | "wide"
      | "full-width"
      | "center"
      | "wrap-right"
      | "wrap-left"
      | "align-end"
      | "align-start";
    width?: number;
    originalHeight?: number;
    originalWidth?: number;
    localId?: string;
  };
};

export type EmojiNodeType = {
  type: "emoji";
  attrs: { shortName: string; id?: string; text?: string; localId?: string };
};

export type ExpandNodeType = {
  type: "expand";
  marks?: unknown[];
  attrs?: { title?: string; localId?: string };
  content: (NonNestableBlockContentType | NestedExpandWithNoMarksNodeType)[];
};

export type ExpandRootOnlyNodeType = {
  type: "expand";
  marks?: BreakoutMarkType[];
  attrs?: { title?: string; localId?: string };
  content: (NonNestableBlockContentType | NestedExpandWithNoMarksNodeType)[];
};

export type ExtensionNodeType = {
  type: "extension";
  marks?: unknown[];
  attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: unknown;
    text?: string;
    layout?: "wide" | "full-width" | "default";
    localId?: string;
  };
};

export type ExtensionWithMarksNodeType = ExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

export type FormattedTextInlineNodeType = TextNodeType & {
  marks?: (
    | LinkMarkType
    | EmMarkType
    | StrongMarkType
    | StrikeMarkType
    | SubsupMarkType
    | UnderlineMarkType
    | TextColorMarkType
    | AnnotationMarkType
    | BackgroundColorMarkType
  )[];
  [key: string]: unknown;
};

export type FragmentMarkType = {
  type: "fragment";
  attrs: { localId: string; name?: string };
};

export type HardBreakNodeType = {
  type: "hardBreak";
  attrs?: { text?: "\n"; localId?: string };
};

export type HeadingNodeType = {
  type: "heading";
  marks?: unknown[];
  attrs: { level: number; localId?: string };
  content?: InlineNodeType[];
};

export type HeadingWithAlignmentNodeType = HeadingNodeType & {
  marks?: AlignmentMarkType[];
  [key: string]: unknown;
};

export type HeadingWithIndentationNodeType = HeadingNodeType & {
  marks?: IndentationMarkType[];
  [key: string]: unknown;
};

export type HeadingWithNoMarksNodeType = HeadingNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

export type IndentationMarkType = {
  type: "indentation";
  attrs: { level: number };
};

export type InlineNodeType =
  | FormattedTextInlineNodeType
  | CodeInlineNodeType
  | DateNodeType
  | EmojiNodeType
  | HardBreakNodeType
  | InlineCardNodeType
  | MentionNodeType
  | PlaceholderNodeType
  | StatusNodeType
  | InlineExtensionWithMarksNodeType
  | MediaInlineNodeType;

export type InlineCardNodeType = {
  type: "inlineCard";
  attrs:
    | { url: string; localId?: string }
    | { data: unknown; localId?: string };
};

export type InlineExtensionNodeType = {
  type: "inlineExtension";
  marks?: unknown[];
  attrs: {
    extensionKey: string;
    extensionType: string;
    parameters?: unknown;
    text?: string;
    localId?: string;
  };
};

export type InlineExtensionWithMarksNodeType = InlineExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

export type LayoutColumnNodeType = {
  type: "layoutColumn";
  attrs: { width: number; localId?: string };
  content: BlockContentType[];
};

export type LayoutSectionFullNodeType = LayoutSectionNodeType & {
  marks?: BreakoutMarkType[];
  content: LayoutColumnNodeType[];
  [key: string]: unknown;
};

export type LayoutSectionNodeType = {
  type: "layoutSection";
  marks?: BreakoutMarkType[];
  attrs?: { localId?: string };
  content: LayoutColumnNodeType[];
};

export type LinkMarkType = {
  type: "link";
  attrs: {
    href: string;
    title?: string;
    id?: string;
    collection?: string;
    occurrenceKey?: string;
  };
};

export type ListItemNodeType = {
  type: "listItem";
  attrs?: { localId?: string };
  content: [
    (
      | ParagraphWithNoMarksNodeType
      | MediaSingleCaptionNodeType
      | MediaSingleFullNodeType
      | CodeBlockNodeType
      | ExtensionWithMarksNodeType
    ),
    (
      | ParagraphWithNoMarksNodeType
      | BulletListNodeType
      | OrderedListNodeType
      | TaskListNodeType
      | MediaSingleCaptionNodeType
      | MediaSingleFullNodeType
      | CodeBlockNodeType
      | ExtensionWithMarksNodeType
    ),
  ][];
};

export type MediaNodeType = {
  type: "media";
  marks?: (LinkMarkType | AnnotationMarkType | BorderMarkType)[];
  attrs:
    | {
        type: "link" | "file";
        localId?: string;
        id: string;
        alt?: string;
        collection: string;
        height?: number;
        occurrenceKey?: string;
        width?: number;
      }
    | {
        type: "external";
        localId?: string;
        alt?: string;
        height?: number;
        width?: number;
        url: string;
      };
};

export type MediaGroupNodeType = {
  type: "mediaGroup";
  content: MediaNodeType[];
};

export type MediaInlineNodeType = {
  type: "mediaInline";
  marks?: (LinkMarkType | AnnotationMarkType | BorderMarkType)[];
  attrs: {
    type?: "link" | "file" | "image";
    localId?: string;
    id: string;
    alt?: string;
    collection: string;
    occurrenceKey?: string;
    width?: number;
    height?: number;
    data?: unknown;
  };
};

export type MediaSingleCaptionNodeType = MediaSingleNodeType & {
  content: [MediaNodeType, CaptionNodeType][];
  [key: string]: unknown;
};

export type MediaSingleFullNodeType = MediaSingleNodeType & {
  content: MediaNodeType[];
  [key: string]: unknown;
};

export type MediaSingleNodeType = {
  type: "mediaSingle";
  marks?: LinkMarkType[];
  attrs?:
    | {
        localId?: string;
        width?: number;
        layout:
          | "wide"
          | "full-width"
          | "center"
          | "wrap-right"
          | "wrap-left"
          | "align-end"
          | "align-start";
        widthType?: "percentage";
      }
    | {
        localId?: string;
        width: number;
        widthType: "pixel";
        layout:
          | "wide"
          | "full-width"
          | "center"
          | "wrap-right"
          | "wrap-left"
          | "align-end"
          | "align-start";
      };
  [key: string]: unknown;
};

export type MentionNodeType = {
  type: "mention";
  attrs: {
    id: string;
    localId?: string;
    text?: string;
    accessLevel?: string;
    userType?: "DEFAULT" | "SPECIAL" | "APP";
  };
};

export type NestedExpandContentType = (
  | ParagraphWithNoMarksNodeType
  | HeadingWithNoMarksNodeType
  | MediaSingleCaptionNodeType
  | MediaSingleFullNodeType
  | MediaGroupNodeType
  | CodeBlockNodeType
  | BulletListNodeType
  | OrderedListNodeType
  | TaskListNodeType
  | DecisionListNodeType
  | RuleNodeType
  | PanelNodeType
  | BlockquoteNodeType
  | ExtensionWithMarksNodeType
)[];

export type NestedExpandNodeType = {
  type: "nestedExpand";
  attrs: { title?: string; localId?: string };
  content: NestedExpandContentType;
};

export type NestedExpandWithNoMarksNodeType = NestedExpandNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

export type NonNestableBlockContentType =
  | ParagraphWithNoMarksNodeType
  | PanelNodeType
  | BlockquoteNodeType
  | OrderedListNodeType
  | BulletListNodeType
  | RuleNodeType
  | HeadingWithNoMarksNodeType
  | CodeBlockNodeType
  | MediaGroupNodeType
  | MediaSingleCaptionNodeType
  | MediaSingleFullNodeType
  | DecisionListNodeType
  | TaskListNodeType
  | TableNodeType
  | BlockCardNodeType
  | EmbedCardNodeType
  | ExtensionWithMarksNodeType;

export type OrderedListNodeType = {
  type: "orderedList";
  attrs?: { order?: number; localId?: string };
  content: ListItemNodeType[];
};

export type PanelNodeType = {
  type: "panel";
  attrs: {
    panelType:
      | "info"
      | "note"
      | "tip"
      | "warning"
      | "error"
      | "success"
      | "custom";
    panelIcon?: string;
    panelIconId?: string;
    panelIconText?: string;
    panelColor?: string;
    localId?: string;
  };
  content: (
    | ParagraphWithNoMarksNodeType
    | HeadingWithNoMarksNodeType
    | BulletListNodeType
    | OrderedListNodeType
    | BlockCardNodeType
    | MediaGroupNodeType
    | MediaSingleCaptionNodeType
    | MediaSingleFullNodeType
    | CodeBlockNodeType
    | TaskListNodeType
    | RuleNodeType
    | DecisionListNodeType
    | ExtensionWithMarksNodeType
  )[];
};

export type ParagraphNodeType = {
  type: "paragraph";
  marks?: unknown[];
  attrs?: { localId?: string };
  content?: InlineNodeType[];
};

export type ParagraphWithAlignmentNodeType = ParagraphNodeType & {
  marks?: AlignmentMarkType[];
  [key: string]: unknown;
};

export type ParagraphWithIndentationNodeType = ParagraphNodeType & {
  marks?: IndentationMarkType[];
  [key: string]: unknown;
};

export type ParagraphWithNoMarksNodeType = ParagraphNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

export type PlaceholderNodeType = {
  type: "placeholder";
  attrs: { text: string; localId?: string };
};

export type RuleNodeType = { type: "rule"; attrs?: { localId?: string } };

export type StatusNodeType = {
  type: "status";
  attrs: {
    text: string;
    color: "neutral" | "purple" | "blue" | "red" | "yellow" | "green";
    localId?: string;
    style?: string;
  };
};

export type StrikeMarkType = { type: "strike" };

export type StrongMarkType = { type: "strong" };

export type SubsupMarkType = { type: "subsup"; attrs: { type: "sub" | "sup" } };

export type TableCellContentType = (
  | ParagraphWithNoMarksNodeType
  | ParagraphWithAlignmentNodeType
  | PanelNodeType
  | BlockquoteNodeType
  | OrderedListNodeType
  | BulletListNodeType
  | RuleNodeType
  | HeadingWithNoMarksNodeType
  | HeadingWithAlignmentNodeType
  | HeadingWithIndentationNodeType
  | CodeBlockNodeType
  | MediaSingleCaptionNodeType
  | MediaSingleFullNodeType
  | MediaGroupNodeType
  | DecisionListNodeType
  | TaskListNodeType
  | BlockCardNodeType
  | EmbedCardNodeType
  | ExtensionWithMarksNodeType
  | NestedExpandWithNoMarksNodeType
)[];

export type TableCellNodeType = {
  type: "tableCell";
  attrs?: {
    colspan?: number;
    rowspan?: number;
    colwidth?: number[];
    background?: string;
    localId?: string;
  };
  content: TableCellContentType;
};

export type TableHeaderNodeType = {
  type: "tableHeader";
  attrs?: {
    colspan?: number;
    rowspan?: number;
    colwidth?: number[];
    background?: string;
    localId?: string;
  };
  content: TableCellContentType;
};

export type TableNodeType = {
  type: "table";
  marks?: FragmentMarkType[];
  attrs?: {
    displayMode?: "default" | "fixed";
    isNumberColumnEnabled?: boolean;
    layout?:
      | "wide"
      | "full-width"
      | "center"
      | "align-end"
      | "align-start"
      | "default";
    localId?: string;
    width?: number;
  };
  content: TableRowNodeType[];
};

export type TableRowNodeType = {
  type: "tableRow";
  attrs?: { localId?: string };
  content: (TableCellNodeType | TableHeaderNodeType)[];
};

export type TaskItemNodeType = {
  type: "taskItem";
  attrs: { localId: string; state: "TODO" | "DONE" };
  content?: InlineNodeType[];
};

export type TaskListNodeType = {
  type: "taskList";
  attrs: { localId: string };
  content: [TaskItemNodeType, TaskItemNodeType | TaskListNodeType][];
};

export type TextNodeType = { type: "text"; marks?: unknown[]; text: string };

export type TextWithNoMarksNodeType = TextNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

export type TextColorMarkType = { type: "textColor"; attrs: { color: string } };

export type UnderlineMarkType = { type: "underline" };
