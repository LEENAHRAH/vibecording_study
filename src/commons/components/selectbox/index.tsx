'use client';

import React, {
  forwardRef,
  SelectHTMLAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import styles from './styles.module.css';

// SelectBox Option 타입 정의
export interface SelectOption {
  /** 옵션 값 */
  value: string;
  /** 옵션 라벨 */
  label: string;
  /** 옵션 비활성화 여부 */
  disabled?: boolean;
  /** 옵션 그룹 */
  group?: string;
}

// SelectBox 컴포넌트 Props 타입 정의
export interface SelectBoxProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** SelectBox 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** SelectBox 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 옵션 목록 */
  options: SelectOption[];
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬퍼 텍스트 */
  helperText?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 입력 표시 */
  required?: boolean;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 커스텀 드롭다운 아이콘 */
  dropdownIcon?: React.ReactNode;
  /** 컨테이너 클래스명 */
  containerClassName?: string;
  /** 라벨 클래스명 */
  labelClassName?: string;
  /** 옵션 변경 핸들러 */
  onOptionChange?: (option: SelectOption | null) => void;
  /** 로딩 상태 */
  loading?: boolean;
  /** 검색 가능 여부 */
  searchable?: boolean;
  /** 다중 선택 여부 */
  multiple?: boolean;
  /** 선택된 값들 (다중 선택시) */
  selectedValues?: string[];
}

/**
 * SelectBox 컴포넌트
 *
 * Figma 디자인을 기반으로 한 완전한 variant 시스템을 제공하는 셀렉트박스 컴포넌트입니다.
 * - variant: primary, secondary, tertiary 스타일 지원
 * - size: small, medium, large 크기 지원
 * - theme: light, dark 테마 지원
 * - 에러 상태, 헬퍼 텍스트, 라벨, 검색 기능 등 다양한 옵션 제공
 * - 접근성(a11y) 완전 지원
 */
export const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      options = [],
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      fullWidth = false,
      placeholder = '선택해주세요',
      dropdownIcon,
      containerClassName = '',
      labelClassName = '',
      className = '',
      disabled = false,
      loading = false,
      searchable = false,
      multiple = false,
      selectedValues = [],
      onOptionChange,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    // 내부 상태 관리
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
      null
    );
    const [internalSelectedValues, setInternalSelectedValues] =
      useState<string[]>(selectedValues);

    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 외부 value prop 변경 감지
    useEffect(() => {
      if (value !== undefined) {
        const option = options.find((opt) => opt.value === value);
        setSelectedOption(option || null);
      }
    }, [value, options]);

    // 다중 선택 값 변경 감지
    useEffect(() => {
      if (multiple) {
        setInternalSelectedValues(selectedValues);
      }
    }, [selectedValues, multiple]);

    // 검색어로 옵션 필터링
    const filteredOptions = searchable
      ? options.filter(
          (option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // CSS 클래스 조합
    const containerClasses = [
      styles.container,
      fullWidth && styles['container--full-width'],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label--${theme}`],
      error && styles['label--error'],
      disabled && styles['label--disabled'],
      labelClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const selectClasses = [
      styles.select,
      styles[`select--${variant}`],
      styles[`select--${size}`],
      styles[`select--${theme}`],
      error && styles['select--error'],
      disabled && styles['select--disabled'],
      loading && styles['select--loading'],
      isOpen && styles['select--open'],
      fullWidth && styles['select--full-width'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const helperClasses = [
      styles.helper,
      styles[`helper--${theme}`],
      error && styles['helper--error'],
    ]
      .filter(Boolean)
      .join(' ');

    // 옵션 선택 핸들러
    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newSelectedValues = internalSelectedValues.includes(option.value)
          ? internalSelectedValues.filter((val) => val !== option.value)
          : [...internalSelectedValues, option.value];

        setInternalSelectedValues(newSelectedValues);
        onOptionChange?.(option);

        // 다중 선택시에는 드롭다운을 열어둠
      } else {
        setSelectedOption(option);
        setIsOpen(false);
        setSearchTerm('');
        onOptionChange?.(option);

        // 네이티브 select 이벤트 트리거
        if (onChange) {
          const syntheticEvent = {
            target: { value: option.value },
            currentTarget: { value: option.value },
          } as React.ChangeEvent<HTMLSelectElement>;
          onChange(syntheticEvent);
        }
      }
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled || loading) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // 다음 옵션으로 이동 로직
            const currentIndex = filteredOptions.findIndex(
              (opt) => opt.value === selectedOption?.value
            );
            const nextIndex = Math.min(
              currentIndex + 1,
              filteredOptions.length - 1
            );
            if (
              filteredOptions[nextIndex] &&
              !filteredOptions[nextIndex].disabled
            ) {
              handleOptionSelect(filteredOptions[nextIndex]);
            }
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            const currentIndex = filteredOptions.findIndex(
              (opt) => opt.value === selectedOption?.value
            );
            const prevIndex = Math.max(currentIndex - 1, 0);
            if (
              filteredOptions[prevIndex] &&
              !filteredOptions[prevIndex].disabled
            ) {
              handleOptionSelect(filteredOptions[prevIndex]);
            }
          }
          break;
      }
    };

    // 검색 입력 핸들러
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    // 드롭다운 아이콘 렌더링
    const renderDropdownIcon = () => {
      if (loading) {
        return (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
        );
      }

      if (dropdownIcon) {
        return <span className={styles.dropdownIcon}>{dropdownIcon}</span>;
      }

      return (
        <svg
          className={styles.dropdownIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
        </svg>
      );
    };

    // 선택된 값 표시 텍스트
    const getDisplayText = () => {
      if (multiple) {
        if (internalSelectedValues.length === 0) return placeholder;
        if (internalSelectedValues.length === 1) {
          const option = options.find(
            (opt) => opt.value === internalSelectedValues[0]
          );
          return option?.label || placeholder;
        }
        return `${internalSelectedValues.length}개 선택됨`;
      }

      return selectedOption?.label || placeholder;
    };

    // 옵션 그룹핑
    const groupedOptions = filteredOptions.reduce((groups, option) => {
      const group = option.group || 'default';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
      return groups;
    }, {} as Record<string, SelectOption[]>);

    return (
      <div className={containerClasses}>
        {/* 라벨 */}
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {/* 셀렉트박스 */}
        <div
          ref={selectRef}
          className={selectClasses}
          onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="selectbox-options"
          aria-label={label || placeholder}
          aria-required={required}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${props.id || 'selectbox'}-error`
              : helperText
              ? `${props.id || 'selectbox'}-helper`
              : undefined
          }
        >
          {/* 선택된 값 표시 영역 */}
          <div className={styles.display}>
            {searchable && isOpen ? (
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="검색..."
                autoFocus
              />
            ) : (
              <span className={styles.displayText}>{getDisplayText()}</span>
            )}
          </div>

          {/* 드롭다운 아이콘 */}
          <div className={styles.iconContainer}>{renderDropdownIcon()}</div>

          {/* 옵션 드롭다운 */}
          {isOpen && (
            <div
              id="selectbox-options"
              className={styles.dropdown}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {Object.keys(groupedOptions).map((groupKey) => (
                <div key={groupKey} className={styles.optionGroup}>
                  {groupKey !== 'default' && (
                    <div className={styles.groupLabel}>{groupKey}</div>
                  )}
                  {groupedOptions[groupKey].map((option) => (
                    <div
                      key={option.value}
                      className={[
                        styles.option,
                        option.disabled && styles['option--disabled'],
                        (multiple
                          ? internalSelectedValues.includes(option.value)
                          : selectedOption?.value === option.value) &&
                          styles['option--selected'],
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleOptionSelect(option)}
                      role="option"
                      aria-selected={
                        multiple
                          ? internalSelectedValues.includes(option.value)
                          : selectedOption?.value === option.value
                      }
                      aria-disabled={option.disabled}
                    >
                      <span className={styles.optionLabel}>{option.label}</span>
                      {(multiple
                        ? internalSelectedValues.includes(option.value)
                        : selectedOption?.value === option.value) && (
                        <div className={styles.checkIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.5 4.5L6 12L2.5 8.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className={styles.noOptions}>
                  {searchable ? '검색 결과가 없습니다.' : '옵션이 없습니다.'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 숨겨진 네이티브 select (폼 제출용) */}
        <select
          ref={ref}
          className={styles.hiddenSelect}
          value={multiple ? undefined : selectedOption?.value || ''}
          multiple={multiple}
          disabled={disabled}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          {...props}
        >
          {multiple ? (
            internalSelectedValues.map((value) => (
              <option key={value} value={value} selected>
                {options.find((opt) => opt.value === value)?.label}
              </option>
            ))
          ) : (
            <>
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>

        {/* 헬퍼 텍스트 또는 에러 메시지 */}
        {(helperText || (error && errorMessage)) && (
          <div
            className={helperClasses}
            id={
              error && errorMessage
                ? `${props.id || 'selectbox'}-error`
                : `${props.id || 'selectbox'}-helper`
            }
          >
            {error && errorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

// 기본 내보내기
export default SelectBox;

// 추가 유틸리티 타입들
export type SelectBoxVariant = SelectBoxProps['variant'];
export type SelectBoxSize = SelectBoxProps['size'];
export type SelectBoxTheme = SelectBoxProps['theme'];



