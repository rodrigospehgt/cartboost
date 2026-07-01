// Widget grid component
import { widgetService } from '../services/widgetService.js';

export class WidgetGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.widgets = [];
        this.init();
    }
    
    async init() {
        this.widgets = await widgetService.getAll();
        this.render();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for widget updates
        window.addEventListener('widgetUpdated', () => this.refresh());
        window.addEventListener('widgetDeleted', () => this.refresh());
    }
    
    refresh() {
        this.init();
    }
    
    render() {
        const template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                }
                
                .widget-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease;
                }
                
                .widget-card:hover {
                    transform: translateY(-2px);
                }
                
                .widget-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .widget-actions button {
                    margin-left: 0.5rem;
                }
            </style>
            
            ${this.widgets.map(widget => `
                <div class="widget-card">
                    <div class="widget-header">
                        <h3>${widget.title}</h3>
                        <div class="widget-actions">
                            <button onclick="editWidget('${widget.id}')">Edit</button>
                            <button onclick="deleteWidget('${widget.id}')">Delete</button>
                        </div>
                    </div>
                    <div class="widget-content">${widget.content}</div>
                </div>
            `).join('')}
            
            <div class="widget-card add-widget">
                <h3>Add New Widget</h3>
                <button onclick="createWidget()">+ Add Widget</button>
            </div>
        `;
        
        this.shadowRoot.innerHTML = template;
    }
}

// Register custom element
customElements.define('widget-grid', WidgetGrid);

// Global functions for event handlers
window.editWidget = (id) => {
    const widget = widgetService.getAll().find(w => w.id === id);
    if (!widget) return;
    
    // Show edit modal or redirect to edit page
    const title = prompt('Edit widget title:', widget.title);
    if (title) {
        widgetService.update(id, { title }).then(() => {
            window.dispatchEvent(new Event('widgetUpdated'));
        });
    }
};

window.deleteWidget = (id) => {
    if (confirm('Are you sure you want to delete this widget?')) {
        widgetService.delete(id).then(() => {
            window.dispatchEvent(new Event('widgetDeleted'));
        });
    }
};

window.createWidget = () => {
    const title = prompt('Enter widget title:');
    if (title) {
        widgetService.create({
            title,
            content: 'Widget content goes here'
        }).then(() => {
            window.dispatchEvent(new Event('widgetUpdated'));
        });
    }
};
