import { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SingleSelectProps {
  multiple?: false;
  value?: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
}

interface MultipleSelectProps {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, onChange, options, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function showSelectList() {
    setIsOpen((isOpen) => !isOpen);
  }

  function clearOption(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectList(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    setIsOpen(false);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((item) => item !== option));
        {
          /*remove da lista se já esta salvo*/
        }
      } else {
        // salva a nova opção
        onChange([...value, option]);
      }
    } else {
      if (option === value) return;

      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      console.log(e.code);
      switch (e.code) {
        case "Enter":
        case "NumpadEnter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;

        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          // eslint-disable-next-line no-case-declarations
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }

        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedIndex, isOpen, options]);

  return (
    <div
      ref={containerRef}
      onClick={showSelectList}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((item) => (
              <button
                key={item.value}
                className={styles["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(item);
                }}
              >
                {item.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button onClick={(e) => clearOption(e)} className={styles["clear-btn"]}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              selectList(e), selectOption(option);
            }}
            key={option.value}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option}
             ${isOptionSelected(option) ? styles.selected : ""}
             ${index === highlightedIndex ? styles.highlighted : ""}
             `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
