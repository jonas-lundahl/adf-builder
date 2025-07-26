type alignment_mark = { type: "alignment"; attrs: { align: "center" | "end" } };

type annotation_mark = {
  type: "annotation";
  attrs: { id: string; annotationType: "inlineComment" };
};

type backgroundColor_mark = {
  type: "backgroundColor";
  attrs: { color: string };
};

type block_content =
  | blockCard_node
  | paragraph_with_no_marks_node
  | paragraph_with_alignment_node
  | paragraph_with_indentation_node
  | mediaSingle_caption_node
  | mediaSingle_full_node
  | codeBlock_node
  | taskList_node
  | bulletList_node
  | orderedList_node
  | heading_with_no_marks_node
  | heading_with_alignment_node
  | heading_with_indentation_node
  | mediaGroup_node
  | decisionList_node
  | rule_node
  | panel_node
  | blockquote_node
  | extension_with_marks_node
  | embedCard_node
  | table_node
  | expand_node
  | bodiedExtension_with_marks_node;

type blockCard_node = {
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

type blockquote_node = {
  type: "blockquote";
  attrs?: { localId?: string };
  content: (
    | paragraph_with_no_marks_node
    | orderedList_node
    | bulletList_node
    | codeBlock_node
    | mediaSingle_caption_node
    | mediaSingle_full_node
    | mediaGroup_node
    | extension_with_marks_node
  )[];
};

type bodiedExtension_node = {
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
  content: non_nestable_block_content[];
};

type bodiedExtension_with_marks_node = bodiedExtension_node & {
  marks?: (dataConsumer_mark | fragment_mark)[];
  [key: string]: unknown;
};

type border_mark = { type: "border"; attrs: { size: number; color: string } };

type breakout_mark = {
  type: "breakout";
  attrs: { mode: "wide" | "full-width"; width?: number };
};

type bulletList_node = {
  type: "bulletList";
  attrs?: { localId?: string };
  content: listItem_node[];
};

type caption_node = {
  type: "caption";
  attrs?: { localId?: string };
  content?: (
    | hardBreak_node
    | mention_node
    | emoji_node
    | date_node
    | placeholder_node
    | inlineCard_node
    | status_node
    | formatted_text_inline_node
    | code_inline_node
  )[];
};

type code_inline_node = text_node & {
  marks?: (code_mark | link_mark | annotation_mark)[];
  [key: string]: unknown;
};

type code_mark = { type: "code" };

type codeBlock_node = {
  type: "codeBlock";
  marks?: unknown[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: text_with_no_marks_node[];
};

type codeBlock_root_only_node = {
  type: "codeBlock";
  marks?: breakout_mark[];
  attrs?: { language?: string; uniqueId?: string; localId?: string };
  content?: text_with_no_marks_node[];
};

type dataConsumer_mark = { type: "dataConsumer"; attrs: { sources: string[] } };

type date_node = {
  type: "date";
  attrs: { timestamp: string; localId?: string };
};

type decisionItem_node = {
  type: "decisionItem";
  attrs: { localId: string; state: string };
  content?: inline_node[];
};

type decisionList_node = {
  type: "decisionList";
  attrs: { localId: string };
  content: decisionItem_node[];
};

type doc_node = {
  type: "doc";
  content: (
    | blockCard_node
    | codeBlock_node
    | mediaSingle_caption_node
    | mediaSingle_full_node
    | paragraph_with_alignment_node
    | paragraph_with_indentation_node
    | paragraph_with_no_marks_node
    | taskList_node
    | orderedList_node
    | bulletList_node
    | blockquote_node
    | decisionList_node
    | embedCard_node
    | extension_with_marks_node
    | heading_with_indentation_node
    | heading_with_no_marks_node
    | heading_with_alignment_node
    | mediaGroup_node
    | rule_node
    | panel_node
    | table_node
    | bodiedExtension_with_marks_node
    | expand_node
    | codeBlock_root_only_node
    | layoutSection_full_node
    | expand_root_only_node
  )[];
  version: 1;
};

type em_mark = { type: "em" };

type embedCard_node = {
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

type emoji_node = {
  type: "emoji";
  attrs: { shortName: string; id?: string; text?: string; localId?: string };
};

type expand_node = {
  type: "expand";
  marks?: unknown[];
  attrs?: { title?: string; localId?: string };
  content: (non_nestable_block_content | nestedExpand_with_no_marks_node)[];
};

type expand_root_only_node = {
  type: "expand";
  marks?: breakout_mark[];
  attrs?: { title?: string; localId?: string };
  content: (non_nestable_block_content | nestedExpand_with_no_marks_node)[];
};

type extension_node = {
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

type extension_with_marks_node = extension_node & {
  marks?: (dataConsumer_mark | fragment_mark)[];
  [key: string]: unknown;
};

type formatted_text_inline_node = text_node & {
  marks?: (
    | link_mark
    | em_mark
    | strong_mark
    | strike_mark
    | subsup_mark
    | underline_mark
    | textColor_mark
    | annotation_mark
    | backgroundColor_mark
  )[];
  [key: string]: unknown;
};

type fragment_mark = {
  type: "fragment";
  attrs: { localId: string; name?: string };
};

type hardBreak_node = {
  type: "hardBreak";
  attrs?: { text?: "\n"; localId?: string };
};

type heading_node = {
  type: "heading";
  marks?: unknown[];
  attrs: { level: number; localId?: string };
  content?: inline_node[];
};

type heading_with_alignment_node = heading_node & {
  marks?: alignment_mark[];
  [key: string]: unknown;
};

type heading_with_indentation_node = heading_node & {
  marks?: indentation_mark[];
  [key: string]: unknown;
};

type heading_with_no_marks_node = heading_node & {
  marks?: unknown[];
  [key: string]: unknown;
};

type indentation_mark = { type: "indentation"; attrs: { level: number } };

type inline_node =
  | formatted_text_inline_node
  | code_inline_node
  | date_node
  | emoji_node
  | hardBreak_node
  | inlineCard_node
  | mention_node
  | placeholder_node
  | status_node
  | inlineExtension_with_marks_node
  | mediaInline_node;

type inlineCard_node = {
  type: "inlineCard";
  attrs:
    | { url: string; localId?: string }
    | { data: unknown; localId?: string };
};

type inlineExtension_node = {
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

type inlineExtension_with_marks_node = inlineExtension_node & {
  marks?: (dataConsumer_mark | fragment_mark)[];
  [key: string]: unknown;
};

type layoutColumn_node = {
  type: "layoutColumn";
  attrs: { width: number; localId?: string };
  content: block_content[];
};

type layoutSection_full_node = layoutSection_node & {
  marks?: breakout_mark[];
  content: layoutColumn_node[];
  [key: string]: unknown;
};

type layoutSection_node = {
  type: "layoutSection";
  marks?: breakout_mark[];
  attrs?: { localId?: string };
  content: layoutColumn_node[];
};

type link_mark = {
  type: "link";
  attrs: {
    href: string;
    title?: string;
    id?: string;
    collection?: string;
    occurrenceKey?: string;
  };
};

type listItem_node = {
  type: "listItem";
  attrs?: { localId?: string };
  content: [
    (
      | paragraph_with_no_marks_node
      | mediaSingle_caption_node
      | mediaSingle_full_node
      | codeBlock_node
      | extension_with_marks_node
    ),
    (
      | paragraph_with_no_marks_node
      | bulletList_node
      | orderedList_node
      | taskList_node
      | mediaSingle_caption_node
      | mediaSingle_full_node
      | codeBlock_node
      | extension_with_marks_node
    ),
  ][];
};

type media_node = {
  type: "media";
  marks?: (link_mark | annotation_mark | border_mark)[];
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

type mediaGroup_node = { type: "mediaGroup"; content: media_node[] };

type mediaInline_node = {
  type: "mediaInline";
  marks?: (link_mark | annotation_mark | border_mark)[];
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

type mediaSingle_caption_node = mediaSingle_node & {
  content: [media_node, caption_node][];
  [key: string]: unknown;
};

type mediaSingle_full_node = mediaSingle_node & {
  content: media_node[];
  [key: string]: unknown;
};

type mediaSingle_node = {
  type: "mediaSingle";
  marks?: link_mark[];
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

type mention_node = {
  type: "mention";
  attrs: {
    id: string;
    localId?: string;
    text?: string;
    accessLevel?: string;
    userType?: "DEFAULT" | "SPECIAL" | "APP";
  };
};

type nestedExpand_content = (
  | paragraph_with_no_marks_node
  | heading_with_no_marks_node
  | mediaSingle_caption_node
  | mediaSingle_full_node
  | mediaGroup_node
  | codeBlock_node
  | bulletList_node
  | orderedList_node
  | taskList_node
  | decisionList_node
  | rule_node
  | panel_node
  | blockquote_node
  | extension_with_marks_node
)[];

type nestedExpand_node = {
  type: "nestedExpand";
  attrs: { title?: string; localId?: string };
  content: nestedExpand_content;
};

type nestedExpand_with_no_marks_node = nestedExpand_node & {
  marks?: unknown[];
  [key: string]: unknown;
};

type non_nestable_block_content =
  | paragraph_with_no_marks_node
  | panel_node
  | blockquote_node
  | orderedList_node
  | bulletList_node
  | rule_node
  | heading_with_no_marks_node
  | codeBlock_node
  | mediaGroup_node
  | mediaSingle_caption_node
  | mediaSingle_full_node
  | decisionList_node
  | taskList_node
  | table_node
  | blockCard_node
  | embedCard_node
  | extension_with_marks_node;

type orderedList_node = {
  type: "orderedList";
  attrs?: { order?: number; localId?: string };
  content: listItem_node[];
};

type panel_node = {
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
    | paragraph_with_no_marks_node
    | heading_with_no_marks_node
    | bulletList_node
    | orderedList_node
    | blockCard_node
    | mediaGroup_node
    | mediaSingle_caption_node
    | mediaSingle_full_node
    | codeBlock_node
    | taskList_node
    | rule_node
    | decisionList_node
    | extension_with_marks_node
  )[];
};

type paragraph_node = {
  type: "paragraph";
  marks?: unknown[];
  attrs?: { localId?: string };
  content?: inline_node[];
};

type paragraph_with_alignment_node = paragraph_node & {
  marks?: alignment_mark[];
  [key: string]: unknown;
};

type paragraph_with_indentation_node = paragraph_node & {
  marks?: indentation_mark[];
  [key: string]: unknown;
};

type paragraph_with_no_marks_node = paragraph_node & {
  marks?: unknown[];
  [key: string]: unknown;
};

type placeholder_node = {
  type: "placeholder";
  attrs: { text: string; localId?: string };
};

type rule_node = { type: "rule"; attrs?: { localId?: string } };

type status_node = {
  type: "status";
  attrs: {
    text: string;
    color: "neutral" | "purple" | "blue" | "red" | "yellow" | "green";
    localId?: string;
    style?: string;
  };
};

type strike_mark = { type: "strike" };

type strong_mark = { type: "strong" };

type subsup_mark = { type: "subsup"; attrs: { type: "sub" | "sup" } };

type table_cell_content = (
  | paragraph_with_no_marks_node
  | paragraph_with_alignment_node
  | panel_node
  | blockquote_node
  | orderedList_node
  | bulletList_node
  | rule_node
  | heading_with_no_marks_node
  | heading_with_alignment_node
  | heading_with_indentation_node
  | codeBlock_node
  | mediaSingle_caption_node
  | mediaSingle_full_node
  | mediaGroup_node
  | decisionList_node
  | taskList_node
  | blockCard_node
  | embedCard_node
  | extension_with_marks_node
  | nestedExpand_with_no_marks_node
)[];

type table_cell_node = {
  type: "tableCell";
  attrs?: {
    colspan?: number;
    rowspan?: number;
    colwidth?: number[];
    background?: string;
    localId?: string;
  };
  content: table_cell_content;
};

type table_header_node = {
  type: "tableHeader";
  attrs?: {
    colspan?: number;
    rowspan?: number;
    colwidth?: number[];
    background?: string;
    localId?: string;
  };
  content: table_cell_content;
};

type table_node = {
  type: "table";
  marks?: fragment_mark[];
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
  content: table_row_node[];
};

type table_row_node = {
  type: "tableRow";
  attrs?: { localId?: string };
  content: (table_cell_node | table_header_node)[];
};

type taskItem_node = {
  type: "taskItem";
  attrs: { localId: string; state: "TODO" | "DONE" };
  content?: inline_node[];
};

type taskList_node = {
  type: "taskList";
  attrs: { localId: string };
  content: [taskItem_node, taskItem_node | taskList_node][];
};

type text_node = { type: "text"; marks?: unknown[]; text: string };

type text_with_no_marks_node = text_node & {
  marks?: unknown[];
  [key: string]: unknown;
};

type textColor_mark = { type: "textColor"; attrs: { color: string } };

type underline_mark = { type: "underline" };
