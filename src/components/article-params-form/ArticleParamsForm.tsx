import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return (): void => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  const handleApply = (): void => {
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={containerRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form}>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(fontFamilyOption): void => {
              setFormState(
                (state: ArticleStateType): ArticleStateType => ({
                  ...state,
                  fontFamilyOption,
                })
              );
            }}
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(fontSizeOption): void => {
              setFormState(
                (state: ArticleStateType): ArticleStateType => ({
                  ...state,
                  fontSizeOption,
                })
              );
            }}
          />

          <Select
            title="Цвет текста"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(fontColor): void => {
              setFormState(
                (state: ArticleStateType): ArticleStateType => ({
                  ...state,
                  fontColor,
                })
              );
            }}
          />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(backgroundColor): void => {
              setFormState(
                (state: ArticleStateType): ArticleStateType => ({
                  ...state,
                  backgroundColor,
                })
              );
            }}
          />

          <RadioGroup
            title="Ширина контента"
            name="content-width"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(contentWidth): void => {
              setFormState(
                (state: ArticleStateType): ArticleStateType => ({
                  ...state,
                  contentWidth,
                })
              );
            }}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleReset}
            />
            <Button
              title="Применить"
              htmlType="button"
              type="apply"
              onClick={handleApply}
            />
          </div>
        </form>
      </aside>
    </div>
  );
};
