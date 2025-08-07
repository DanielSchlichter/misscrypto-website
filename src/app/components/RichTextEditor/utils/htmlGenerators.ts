// Function to get clean HTML for publishing
export const getCleanContentForPublishing = (htmlContent: string): string => {
  // Create a temporary DOM to manipulate
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Remove all delete buttons
  const deleteButtons = tempDiv.querySelectorAll('.delete-module-btn');
  deleteButtons.forEach(btn => btn.remove());
  
  // Remove editor-specific classes but keep content classes
  const editableModules = tempDiv.querySelectorAll('.editable-module');
  editableModules.forEach(module => {
    module.classList.remove('editable-module');
    // Remove data attributes used for editing
    module.removeAttribute('data-module-id');
    module.removeAttribute('data-module-type');
  });
  
  // Remove any other editor-specific elements
  const editorElements = tempDiv.querySelectorAll('[data-editor-only]');
  editorElements.forEach(el => el.remove());
  
  return tempDiv.innerHTML;
};

// Generate clean HTML for publishing (without editor elements)
export const generateCleanModuleHtml = (type: string, data: any): string => {
  switch (type) {
    case 'heading':
      return `
<section class="numbered-heading mc-content-section" itemScope itemType="https://schema.org/Article">
  <div class="heading-number mc-heading-number">${data.number}</div>
  <h2 class="heading-title mc-heading-title" itemProp="headline">${data.title}</h2>
</section>`;
    case 'highlight':
      return `
<aside class="highlight-box mc-highlight" itemScope itemType="https://schema.org/SpecialAnnouncement">
  <div class="highlight-content mc-highlight-content">
    <span class="highlight-label mc-highlight-label" itemProp="category">${data.label}</span>
    <p class="highlight-text mc-highlight-text" itemProp="text">${data.text}</p>
  </div>
</aside>`;
    case 'stats':
      return `
<div class="stats-grid mc-stats" itemScope itemType="https://schema.org/Table">
  ${data.items.map((item: any) => `
    <div class="stat-item mc-stat-item" itemScope itemType="https://schema.org/Statistic">
      <div class="stat-value mc-stat-value" itemProp="value">${item.value}</div>
      <div class="stat-label mc-stat-label" itemProp="name">${item.label}</div>
    </div>
  `).join('')}
</div>`;
    case 'security':
      return `
<aside class="security-box mc-security" itemScope itemType="https://schema.org/Service">
  <div class="security-content mc-security-content">
    <div class="security-icon mc-security-icon" aria-hidden="true">${data.icon}</div>
    <h3 class="security-title mc-security-title" itemProp="name">${data.title}</h3>
    <p class="security-description mc-security-desc" itemProp="description">${data.description}</p>
  </div>
</aside>`;
    case 'image':
      return `
<figure class="mc-image" itemScope itemType="https://schema.org/ImageObject">
  <img 
    src="${data.url}" 
    alt="${data.alt || ''}" 
    class="mc-image-element" 
    style="height: ${data.height || 300}px; width: 100%; object-fit: cover;" 
    itemProp="contentUrl"
    loading="lazy"
    decoding="async"
  />
  <meta itemProp="width" content="100%" />
  <meta itemProp="height" content="${data.height || 300}" />
  <meta itemProp="encodingFormat" content="${data.url ? data.url.split('.').pop()?.toLowerCase() : 'jpg'}" />
</figure>`;
    case 'text':
      const fontSize = data.fontSize === 'small' ? '0.875rem' : data.fontSize === 'large' ? '1.125rem' : '1rem';
      const textAlign = data.alignment || 'left';
      const textColor = data.color || '#f8dfa5';
      return `
<div class="text-block mc-text" itemScope itemType="https://schema.org/Text" style="font-size: ${fontSize}; text-align: ${textAlign}; color: ${textColor};">
  <p class="mc-text-content" itemProp="text">${data.content}</p>
</div>`;
    default:
      return '';
  }
};

// Generate module HTML (for editor with delete buttons)
export const generateModuleHtml = (type: string, data: any, editingModuleId?: string | null): string => {
  const moduleId = editingModuleId || `${type}-${Date.now()}-${Math.random()}`;
  
  switch (type) {
    case 'heading':
      return `
<section class="numbered-heading editable-module mc-content-section" data-module-id="${moduleId}" data-module-type="${type}" itemScope itemType="https://schema.org/Article">
  <button type="button" class="delete-module-btn" aria-label="Überschrift löschen">×</button>
  <span class="heading-number" aria-hidden="true">${data.number}</span>
  <h2 class="mc-heading" itemProp="headline">${data.title}</h2>
</section>`;
    case 'highlight':
      return `
<aside class="highlight-box editable-module mc-highlight" data-module-id="${moduleId}" data-module-type="${type}" role="note" itemScope itemType="https://schema.org/Quotation">
  <button type="button" class="delete-module-btn" aria-label="Highlight-Box löschen">×</button>
  <span class="highlight-label mc-label">${data.label}</span>
  <p class="mc-highlight-text" itemProp="text">${data.text}</p>
</aside>`;
    case 'stats':
      return `
<section class="stats-grid editable-module mc-statistics" data-module-id="${moduleId}" data-module-type="${type}" aria-label="Statistiken" itemScope itemType="https://schema.org/Table">
  <button type="button" class="delete-module-btn" aria-label="Statistik-Grid löschen">×</button>
  ${data.items.map((item: any, index: number) => `
  <div class="stat-item mc-stat" itemScope itemType="https://schema.org/PropertyValue">
    <div class="stat-value mc-stat-value" itemProp="value">${item.value}</div>
    <div class="stat-label mc-stat-label" itemProp="name">${item.label}</div>
  </div>`).join('')}
</section>`;
    case 'security':
      return `
<aside class="security-box editable-module mc-security" data-module-id="${moduleId}" data-module-type="${type}" role="complementary" itemScope itemType="https://schema.org/SecurityPolicy">
  <button type="button" class="delete-module-btn" aria-label="Sicherheits-Box löschen">×</button>
  <span class="security-icon mc-icon" aria-hidden="true">${data.icon}</span>
  <div class="security-content mc-security-content">
    <h3 class="security-title mc-security-title" itemProp="name">${data.title}</h3>
    <p class="security-description mc-security-desc" itemProp="description">${data.description}</p>
  </div>
</aside>`;
    case 'image':
      return `
<figure class="image-box editable-module mc-image" data-module-id="${moduleId}" data-module-type="${type}" itemScope itemType="https://schema.org/ImageObject">
  <button type="button" class="delete-module-btn" aria-label="Bild löschen">×</button>
  <img 
    src="${data.url}" 
    alt="${data.alt || ''}" 
    class="mc-image-element" 
    style="height: ${data.height || 300}px; width: 100%; object-fit: cover;" 
    itemProp="contentUrl"
    loading="lazy"
    decoding="async"
  />
  <meta itemProp="width" content="100%" />
  <meta itemProp="height" content="${data.height || 300}" />
  <meta itemProp="encodingFormat" content="${data.url ? data.url.split('.').pop()?.toLowerCase() : 'jpg'}" />
</figure>`;
    case 'text':
      const fontSize = data.fontSize === 'small' ? '0.875rem' : data.fontSize === 'large' ? '1.125rem' : '1rem';
      const textAlign = data.alignment || 'left';
      const textColor = data.color || '#f8dfa5';
      return `
<div class="text-block editable-module mc-text" data-module-id="${moduleId}" data-module-type="${type}" itemScope itemType="https://schema.org/Text" style="font-size: ${fontSize}; text-align: ${textAlign}; color: ${textColor};">
  <button type="button" class="delete-module-btn" aria-label="Text-Block löschen">×</button>
  <p class="mc-text-content" itemProp="text">${data.content}</p>
</div>`;
    default:
      return '';
  }
}; 