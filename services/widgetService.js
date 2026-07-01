// Widget service for managing widgets
export class WidgetService {
    constructor() {
        // Simulated database
        this.widgets = JSON.parse(localStorage.getItem('widgets') || '[]');
    }
    
    // Get all widgets
    getAll() {
        return this.widgets;
    }
    
    // Create a new widget
    async create(widgetData) {
        const newWidget = {
            id: Date.now().toString(),
            ...widgetData,
            createdAt: new Date().toISOString()
        };
        
        this.widgets.push(newWidget);
        this.save();
        return newWidget;
    }
    
    // Update a widget
    async update(id, widgetData) {
        const index = this.widgets.findIndex(w => w.id === id);
        if (index === -1) throw new Error('Widget not found');
        
        this.widgets[index] = {
            ...this.widgets[index],
            ...widgetData
        };
        
        this.save();
        return this.widgets[index];
    }
    
    // Delete a widget
    async delete(id) {
        this.widgets = this.widgets.filter(w => w.id !== id);
        this.save();
    }
    
    // Save to localStorage
    save() {
        localStorage.setItem('widgets', JSON.stringify(this.widgets));
    }
}

// Export instance
export const widgetService = new WidgetService();
