export const anomalyDetection = {
    resetInterval: 5 * 60 * 1000,
    lastError: null,
    errorCount: 0,
    maxError: 5,
    add: function (error) {
        const now = new Date().getTime()
        console.error(now, error)
        if (this.lastError && now - this.lastError > this.resetInterval) {
            this.lastError = null
            this.errorCount = 1
        } else if (this.errorCount >= this.maxError) {
            console.info('Too many errors, shutting down')
            process.exit()
        } else {
            this.lastError = now
            this.errorCount++
        }
    }
}