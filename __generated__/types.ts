type AlignmentMarkType = {
  type: "alignment";
  attrs: { align: "center" | "end" };
};

type AnnotationMarkType = {
  type: "annotation";
  attrs: { id: string; annotationType: "inlineComment" };
};

type BackgroundColorMarkType = {
  type: "backgroundColor";
  attrs: { color: string };
};

type BlockContentType =
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

type BlockCardNodeType = {
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

type BlockquoteNodeType = {
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

type BodiedExtensionNodeType = {
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

type BodiedExtensionWithMarksNodeType = BodiedExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

type BorderMarkType = {
  type: "border";
  attrs: { size: number; color: string };
};

type BreakoutMarkType = {
  type: "breakout";
  attrs: { mode: "wide" | "full-width"; width?: number };
};

type BulletListNodeType = {
  type: "bulletList";
  attrs?: { localId?: string };
  content: ListItemNodeType[];
};

type CaptionNodeType = {
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

type CodeInlineNodeType = TextNodeType & {
  marks?: (CodeMarkType | LinkMarkType | AnnotationMarkType)[];
  [key: string]: unknown;
};

type CodeMarkType = { type: "code" };

type CodeBlockNodeType = {
  type: "codeBlock";
  marks?: unknown[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: TextWithNoMarksNodeType[];
};

type CodeBlockRootOnlyNodeType = {
  type: "codeBlock";
  marks?: BreakoutMarkType[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: TextWithNoMarksNodeType[];
};

type DataConsumerMarkType = {
  type: "dataConsumer";
  attrs: { sources: string[] };
};

type DateNodeType = {
  type: "date";
  attrs: { timestamp: string; localId?: string };
};

type DecisionItemNodeType = {
  type: "decisionItem";
  attrs: { localId: string; state: string };
  content?: InlineNodeType[];
};

type DecisionListNodeType = {
  type: "decisionList";
  attrs: { localId: string };
  content: DecisionItemNodeType[];
};

type DocNodeType = {
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

type EmMarkType = { type: "em" };

type EmbedCardNodeType = {
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

type EmojiNodeType = {
  type: "emoji";
  attrs: { shortName: string; id?: string; text?: string; localId?: string };
};

type ExpandNodeType = {
  type: "expand";
  marks?: unknown[];
  attrs?: { title?: string; localId?: string };
  content: (NonNestableBlockContentType | NestedExpandWithNoMarksNodeType)[];
};

type ExpandRootOnlyNodeType = {
  type: "expand";
  marks?: BreakoutMarkType[];
  attrs?: { title?: string; localId?: string };
  content: (NonNestableBlockContentType | NestedExpandWithNoMarksNodeType)[];
};

type ExtensionNodeType = {
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

type ExtensionWithMarksNodeType = ExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

type FormattedTextInlineNodeType = TextNodeType & {
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

type FragmentMarkType = {
  type: "fragment";
  attrs: { localId: string; name?: string };
};

type HardBreakNodeType = {
  type: "hardBreak";
  attrs?: { text?: "\n"; localId?: string };
};

type HeadingNodeType = {
  type: "heading";
  marks?: unknown[];
  attrs: { level: number; localId?: string };
  content?: InlineNodeType[];
};

type HeadingWithAlignmentNodeType = HeadingNodeType & {
  marks?: AlignmentMarkType[];
  [key: string]: unknown;
};

type HeadingWithIndentationNodeType = HeadingNodeType & {
  marks?: IndentationMarkType[];
  [key: string]: unknown;
};

type HeadingWithNoMarksNodeType = HeadingNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

type IndentationMarkType = { type: "indentation"; attrs: { level: number } };

type InlineNodeType =
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

type InlineCardNodeType = {
  type: "inlineCard";
  attrs:
    | { url: string; localId?: string }
    | { data: unknown; localId?: string };
};

type InlineExtensionNodeType = {
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

type InlineExtensionWithMarksNodeType = InlineExtensionNodeType & {
  marks?: (DataConsumerMarkType | FragmentMarkType)[];
  [key: string]: unknown;
};

type LayoutColumnNodeType = {
  type: "layoutColumn";
  attrs: { width: number; localId?: string };
  content: BlockContentType[];
};

type LayoutSectionFullNodeType = LayoutSectionNodeType & {
  marks?: BreakoutMarkType[];
  content: LayoutColumnNodeType[];
  [key: string]: unknown;
};

type LayoutSectionNodeType = {
  type: "layoutSection";
  marks?: BreakoutMarkType[];
  attrs?: { localId?: string };
  content: LayoutColumnNodeType[];
};

type LinkMarkType = {
  type: "link";
  attrs: {
    href: string;
    title?: string;
    id?: string;
    collection?: string;
    occurrenceKey?: string;
  };
};

type ListItemNodeType = {
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

type MediaNodeType = {
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

type MediaGroupNodeType = { type: "mediaGroup"; content: MediaNodeType[] };

type MediaInlineNodeType = {
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

type MediaSingleCaptionNodeType = MediaSingleNodeType & {
  content: [MediaNodeType, CaptionNodeType][];
  [key: string]: unknown;
};

type MediaSingleFullNodeType = MediaSingleNodeType & {
  content: MediaNodeType[];
  [key: string]: unknown;
};

type MediaSingleNodeType = {
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

type MentionNodeType = {
  type: "mention";
  attrs: {
    id: string;
    localId?: string;
    text?: string;
    accessLevel?: string;
    userType?: "DEFAULT" | "SPECIAL" | "APP";
  };
};

type NestedExpandContentType = (
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

type NestedExpandNodeType = {
  type: "nestedExpand";
  attrs: { title?: string; localId?: string };
  content: NestedExpandContentType;
};

type NestedExpandWithNoMarksNodeType = NestedExpandNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

type NonNestableBlockContentType =
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

type OrderedListNodeType = {
  type: "orderedList";
  attrs?: { order?: number; localId?: string };
  content: ListItemNodeType[];
};

type PanelNodeType = {
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

type ParagraphNodeType = {
  type: "paragraph";
  marks?: unknown[];
  attrs?: { localId?: string };
  content?: InlineNodeType[];
};

type ParagraphWithAlignmentNodeType = ParagraphNodeType & {
  marks?: AlignmentMarkType[];
  [key: string]: unknown;
};

type ParagraphWithIndentationNodeType = ParagraphNodeType & {
  marks?: IndentationMarkType[];
  [key: string]: unknown;
};

type ParagraphWithNoMarksNodeType = ParagraphNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

type PlaceholderNodeType = {
  type: "placeholder";
  attrs: { text: string; localId?: string };
};

type RuleNodeType = { type: "rule"; attrs?: { localId?: string } };

type StatusNodeType = {
  type: "status";
  attrs: {
    text: string;
    color: "neutral" | "purple" | "blue" | "red" | "yellow" | "green";
    localId?: string;
    style?: string;
  };
};

type StrikeMarkType = { type: "strike" };

type StrongMarkType = { type: "strong" };

type SubsupMarkType = { type: "subsup"; attrs: { type: "sub" | "sup" } };

type TableCellContentType = (
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

type TableCellNodeType = {
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

type TableHeaderNodeType = {
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

type TableNodeType = {
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

type TableRowNodeType = {
  type: "tableRow";
  attrs?: { localId?: string };
  content: (TableCellNodeType | TableHeaderNodeType)[];
};

type TaskItemNodeType = {
  type: "taskItem";
  attrs: { localId: string; state: "TODO" | "DONE" };
  content?: InlineNodeType[];
};

type TaskListNodeType = {
  type: "taskList";
  attrs: { localId: string };
  content: [TaskItemNodeType, TaskItemNodeType | TaskListNodeType][];
};

type TextNodeType = { type: "text"; marks?: unknown[]; text: string };

type TextWithNoMarksNodeType = TextNodeType & {
  marks?: unknown[];
  [key: string]: unknown;
};

type TextColorMarkType = { type: "textColor"; attrs: { color: string } };

type UnderlineMarkType = { type: "underline" };
