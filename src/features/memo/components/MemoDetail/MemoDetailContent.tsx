import MDEditor from '@uiw/react-md-editor';

interface MemoDetailContentProps {
  content: string;
}

const MemoDetailContent = ({ content }: MemoDetailContentProps) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <MDEditor.Markdown source={content} className="prose max-w-none" />
    </div>
  );
};

export default MemoDetailContent;
