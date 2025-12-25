/**
 * Performance Monitoring Utility
 * Tracks timing metrics for critical user flows:
 * 1. Category navigation (loader → navigate → products shown)
 * 2. Add to cart when not logged in (loader → route → success)
 * 3. Logo click/app load (APIs called → response mapped)
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.activeTimers = new Map();
    // Expose activeTimers for external access
    if (typeof window !== 'undefined') {
      window.__performanceActiveTimers = this.activeTimers;
    }
  }

  /**
   * Start a performance timer
   * @param {string} eventId - Unique identifier for the event
   * @param {string} eventType - Type of event (category-click, add-to-cart, app-load, etc.)
   * @param {Object} metadata - Additional metadata about the event
   * @returns {string} eventId
   */
  start(eventId, eventType, metadata = {}) {
    const timer = {
      eventId,
      eventType,
      startTime: performance.now(),
      startTimestamp: Date.now(),
      metadata,
      milestones: [],
    };

    this.activeTimers.set(eventId, timer);
    
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`[Perf] Started: ${eventType}`, { eventId, metadata });
    }

    return eventId;
  }

  /**
   * Mark a milestone in an active timer
   * @param {string} eventId - Event identifier
   * @param {string} milestoneName - Name of the milestone (e.g., 'loader-shown', 'navigation-complete')
   * @param {Object} data - Additional data for this milestone
   */
  markMilestone(eventId, milestoneName, data = {}) {
    const timer = this.activeTimers.get(eventId);
    if (!timer) {
      console.warn(`[Perf] No active timer found for eventId: ${eventId}`);
      return;
    }

    const now = performance.now();
    const milestone = {
      name: milestoneName,
      time: now,
      elapsed: now - timer.startTime,
      timestamp: Date.now(),
      data,
    };

    timer.milestones.push(milestone);

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`[Perf] Milestone: ${milestoneName}`, {
        eventId,
        elapsed: `${milestone.elapsed.toFixed(2)}ms`,
        data,
      });
    }
  }

  /**
   * End a performance timer and record the metric
   * @param {string} eventId - Event identifier
   * @param {string} status - Status: 'success', 'error', 'cancelled'
   * @param {Object} finalData - Final data to include
   */
  end(eventId, status = 'success', finalData = {}) {
    const timer = this.activeTimers.get(eventId);
    if (!timer) {
      console.warn(`[Perf] No active timer found for eventId: ${eventId}`);
      return null;
    }

    const endTime = performance.now();
    const totalDuration = endTime - timer.startTime;

    const metric = {
      eventId,
      eventType: timer.eventType,
      status,
      startTime: timer.startTimestamp,
      endTime: Date.now(),
      duration: totalDuration,
      milestones: timer.milestones,
      metadata: { ...timer.metadata, ...finalData },
    };

    this.metrics.push(metric);
    this.activeTimers.delete(eventId);

    // Log summary
    if (typeof window !== 'undefined') {
      const summary = this.getSummary(metric);
      console.log(`[Perf] Completed: ${timer.eventType}`, summary);

      // Store in window for debugging
      if (!window.__performanceMetrics) {
        window.__performanceMetrics = [];
      }
      window.__performanceMetrics.push(metric);

      // Emit custom event for analytics
      try {
        window.dispatchEvent(
          new CustomEvent('performance-metric', { detail: metric })
        );
      } catch (e) {
        // Ignore errors
      }
    }

    return metric;
  }

  /**
   * Get a human-readable summary of a metric
   */
  getSummary(metric) {
    const summary = {
      duration: `${metric.duration.toFixed(2)}ms`,
      status: metric.status,
    };

    // Add milestone timings
    if (metric.milestones.length > 0) {
      summary.milestones = metric.milestones.map((m) => ({
        name: m.name,
        elapsed: `${m.elapsed.toFixed(2)}ms`,
      }));
    }

    return summary;
  }

  /**
   * Get all metrics for a specific event type
   */
  getMetricsByType(eventType) {
    return this.metrics.filter((m) => m.eventType === eventType);
  }

  /**
   * Get the latest metric for an event type
   */
  getLatestMetric(eventType) {
    const filtered = this.getMetricsByType(eventType);
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = [];
    this.activeTimers.clear();
    if (typeof window !== 'undefined') {
      window.__performanceMetrics = [];
    }
  }

  /**
   * Export metrics as JSON
   */
  export() {
    return JSON.stringify(this.metrics, null, 2);
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Make it globally available for debugging
if (typeof window !== 'undefined') {
  window.performanceMonitor = performanceMonitor;
}

export default performanceMonitor;

