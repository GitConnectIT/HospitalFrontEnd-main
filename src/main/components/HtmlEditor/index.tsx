import { Editor } from "@tinymce/tinymce-react";
export interface IHtmlEditorProps {
  initialValue?: string;
  value?: string;
  onInit?: (editor: any) => void;
  onChange?: (html: string) => void;
}
const HtmlEditor = (props: IHtmlEditorProps) => {
  const { initialValue, value, onInit, onChange } = props;

  return (
    <>
      <Editor
        onInit={(_evt, editor) => onInit(editor)}
        onEditorChange={(html) => onChange(html)}
        value={value}
        initialValue={initialValue}
        init={{
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "print",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "code",
            "insertdatetime",
            "media",
            "table",
            "paste",
            "code",
            "wordcount",
            "merge",
          ],
          toolbar:
            "merge-menu | undo redo | code |  fontselect fontsizeselect | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          branding: false,
        }}
      />
    </>
  );
};

export default HtmlEditor;
