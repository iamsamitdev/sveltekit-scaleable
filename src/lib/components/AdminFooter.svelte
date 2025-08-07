<footer class="bg-white border-t border-gray-200 mt-auto">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center space-x-4">
        <p class="text-sm text-gray-600">
          &copy; 2025 SvelteKit Scaleable App
        </p>
        <span class="text-gray-300">|</span>
        <span class="text-sm text-gray-500">Admin Panel v1.0</span>
      </div>
      
      <div class="flex items-center space-x-6 mt-4 md:mt-0">
        <div class="flex items-center space-x-2">
          <div class="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-500">ระบบทำงานปกติ</span>
        </div>
        
        <div class="flex space-x-4 text-sm">
          <a href="/help" class="text-gray-500 hover:text-gray-700 transition-colors">
            📖 คู่มือใช้งาน
          </a>
          <a href="/support" class="text-gray-500 hover:text-gray-700 transition-colors">
            🆘 ขอความช่วยเหลือ
          </a>
          <a href="/feedback" class="text-gray-500 hover:text-gray-700 transition-colors">
            💬 แจ้งปัญหา
          </a>
        </div>
      </div>
    </div>
    
    <!-- Admin Stats Bar -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <div class="flex flex-wrap justify-center md:justify-between items-center text-xs text-gray-400">
        <div class="flex space-x-6">
          <span>🕒 เซสชันล่าสุด: {new Date().toLocaleString('th-TH')}</span>
          <span>📊 ผู้ใช้ออนไลน์: 24</span>
          <span>⚡ เซิร์ฟเวอร์: มีเสถียรภาพ</span>
        </div>
        <div class="mt-2 md:mt-0">
          <span>พัฒนาโดย ทีม SvelteKit Thailand 🇹🇭</span>
        </div>
      </div>
    </div>
  </div>
</footer>
