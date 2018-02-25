global.window = {}
import localStorage from 'mock-local-storage'
import sessionStorage from 'mock-local-storage'
window.localStorage = global.localStorage
window.sessionStorage = global.sessionStorage