import css from "./layout-notes.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = async ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;