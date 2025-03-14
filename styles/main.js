// Document utility class
class DocUtils {
    static init() {
        DocUtils.setupNavigation();
        DocUtils.setupCodeBlocks();
        DocUtils.setupExamples();
    }

    // Setup navigation interaction
    static setupNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                // Remove active state from other links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active state to current link
                link.classList.add('active');
            });
        });
    }

    // Setup code block interaction
    static setupCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
            });
            block.parentNode.insertBefore(copyButton, block);
        });
    }

    // Setup example interaction
    static setupExamples() {
        const examples = document.querySelectorAll('.example');
        examples.forEach(example => {
            const header = example.querySelector('h4');
            const content = example.querySelector('.example-content');
            if (header && content) {
                header.style.cursor = 'pointer';
                content.style.display = 'none';

                header.addEventListener('click', () => {
                    const isVisible = content.style.display === 'block';
                    content.style.display = isVisible ? 'none' : 'block';
                    header.classList.toggle('expanded', !isVisible);
                });
            }
        });
    }
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    DocUtils.init();
});

// Image configuration and loading
document.addEventListener('DOMContentLoaded', function () {
    // Image path configuration
    const imageConfig = {
        basePath: '../../images/',
        imagePaths: {
            // Main interface images
            toolbar: 'toolbar.png',
            rules_area: 'rules_area.png',
            rule_item: 'rule_item.png',
            file_list_overview: 'file_list_overview.png',
            file_sorting: 'file_sorting.png',
            clear_menu: 'clear_menu.png',
            selection_menu: 'selection_menu.png',
            filename_edit: 'filename_edit.png',
            divider_bar: 'divider_bar.png',

            // Feature area images
            side_menu: 'side_menu.png',
            preset_management: 'preset_management.png',
            rule_management_tips: 'rule_management_tips.png',
        },

        // Fallback text for image loading failures
        fallbackText: {
            toolbar: 'Toolbar Interface',
            rules_area: 'Rules Area',
            rule_item: 'Rule Item Details',
            file_list_overview: 'File List Overview',
            file_sorting: 'File Sorting Options',
            clear_menu: 'Clear Menu Options',
            selection_menu: 'Selection Menu Options',
            filename_edit: 'Individual Filename Editing',
            divider_bar: 'Divider Bar',
            side_menu: 'Side Menu',
            preset_management: 'Preset Management Interface',
            rule_management_tips: 'Rule Management Tips',
        },
    };

    // Handle image loading errors
    function handleImageError(img, altText) {
        img.onerror = null; // Prevent infinite loops
        img.alt = altText || 'Image failed to load';
        img.style.padding = '1rem';
        img.style.backgroundColor = '#f8f9fa';
        img.style.border = '1px dashed #ccc';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.minHeight = '100px';
        img.style.position = 'relative';

        // Add error message
        const parent = img.parentNode;
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Image not found: ' + img.getAttribute('src');
        errorMsg.style.color = '#e53935';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '0.5rem';
        parent.appendChild(errorMsg);
    }

    // Initialize all images
    const images = document.querySelectorAll('img.feature-image');
    images.forEach(img => {
        const imgId = img.alt.toLowerCase().replace(/\s+/g, '_');
        const imgPath = imageConfig.imagePaths[imgId];

        if (imgPath) {
            img.setAttribute('src', imageConfig.basePath + imgPath);
            img.onerror = function () {
                handleImageError(this, imageConfig.fallbackText[imgId]);
            };
        }
    });
});
