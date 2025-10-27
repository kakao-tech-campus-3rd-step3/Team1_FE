import MDEditor from '@uiw/react-md-editor';

interface MemoDetailContentProps {
  content: string;
}

const MemoDetailContent = ({ content }: MemoDetailContentProps) => {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-8 overflow-auto">
      <MDEditor.Markdown source={content} className="prose max-w-none" />
    </div>
  );
};

export default MemoDetailContent;
