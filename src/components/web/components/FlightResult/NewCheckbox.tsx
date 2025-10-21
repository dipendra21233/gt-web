type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

function Checkbox({ checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Maison Neue, sans-serif',
        color: disabled ? '#b0b0b0' : '#222',
        fontSize: 16,
        fontWeight: 600,
        userSelect: 'none',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          border: checked ? '2px solid #222' : '2px solid #e5e7eb',
          background: disabled ? '#f3f4f6' : checked ? '#222' : '#fff',
          borderRadius: 6,
          transition: 'all 0.15s',
          marginRight: 4,
          boxShadow: checked ? '0 2px 6px 0 rgba(0,0,0,0.04)' : undefined,
          position: 'relative',
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          style={{
            opacity: 0,
            width: 22,
            height: 22,
            position: 'absolute',
            left: 0,
            top: 0,
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        {checked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            style={{
              display: 'block',
            }}
          >
            <polyline
              points="3.5 7.5 6 10 10.5 4.5"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && (
        <span
          style={{
            color: disabled ? '#b0b0b0' : '#222',
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: 0.1,
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}

export { Checkbox };
