//@ts-nocheck

function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add('dragging');
  const dragStart = [eDown.clientX, eDown.clientY];
  const handleUp = (eUp: Event) => {
    targetEl.classList.remove('dragging');
    targetEl.removeEventListener('mouseup', handleUp);
    const dragEnd = [eUp.clientX, eUp.clientY];
    console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
  }
  targetEl.addEventListener('mouseup', handleUp);
}

const div = document.getElementById('surface');
div.addEventListener('mousedown', handleDrag);

// https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABACwIZgCYBsCmARAJ1QHMAKfOAdzAC5EBRANxzCgEpEBvAKEUQgQBnKIiioCxHFHpZEAXkQVqAOgggCBFlAAq4yVADcvUXqkzVWVIMEAZGMOWoMGUgHIMRYsRhhirtkZ8AmDCiB4kAMpiBCIKANpKYBYwWgAaADSKeFRJEFgprACaALqB-EIiaJi4AKoADvKI5PV0TFoccgB8XMZ80frmeVa29lDKmgC2cMxu4V4+fgG9JhJmWOM4U8xtrHbCLDgEblMggjggda6ZVdg49Ut8QRVhnvSYjQn1yWmZd3XfRVKy2CgjguGUWDgZHcAA9MhgAJ6NK6IOIABkyAEZisoJqg6qQYPJunM3hg4jBiogALQvSLRKAU4psB6IAC+xn6a0czh2UD2UAOR1cJzOFxRN1qdSWHO4IJEGBgjEaGDgagmWmUA1wGtYACEEQBJFyuQTqYCoCA4fxGRWMHkYPkCoXHOCnHCq6gS9C3QgkAJAA
