import css from "./Loader.module.css";

interface LoaderProps {
  isCreating?: boolean;
  isFullScreen?: boolean;
}

export default function Loader({
  isCreating = false,
  isFullScreen = false,
}: LoaderProps) {
  if (isFullScreen) {
    return (
      <div className={css.loaderContainerLg}>
        <div className={css.loaderContainer}>
          <span
            className={isCreating ? `${css.loaderProgress}` : `${css.loader}`}
          ></span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={css.loaderContainer}>
      <span
        className={isCreating ? `${css.loaderProgress}` : `${css.loader}`}
      ></span>
    </div>
  );
}