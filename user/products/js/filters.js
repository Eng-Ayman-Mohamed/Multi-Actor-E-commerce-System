function renderFilters(categories) {
  $("#filters").html(`
    <div class="filter-box shadow-lg sticky-top z-1" style="top:70px !important;">
      <div class="filter-header">
        <h6>Filters</h6>
        <i class="bi bi-funnel"></i>
      </div>

      <div class="filter-group">
        <p class="title">Category</p>
        ${categories
          .map(
            (c) => `
          <label>
            <input type="checkbox" class="category-filter" value="${c}">
            ${c}
          </label>
        `,
          )
          .join("")}
      </div>

      <div class="filter-group">
        <p class="title">Price Range</p>
        <input class="w-100" type="range" min="0" max="2000" value="2000" id="priceRange">
        <div class="price-range ">
          <span>$0</span>
          <span>$2000</span>
        </div>
      </div>

      <button class="clear-btn" id="clearFilters">Clear Filters</button>
    </div>
  `);
}
