Rails.application.routes.draw do
  get 'simplify/masthead'

  root 'dashboard#index'

  # TODO: these probably should got their own PagesController.
  get 'one_column/:page',      to: 'dashboard#one_column'
  get 'two_column/:page',      to: 'dashboard#two_column'
  get 'three_column/:page',    to: 'dashboard#three_column'
  get 'home_page/:page',       to: 'dashboard#home_page'
  get 'ad_landing_page/:page', to: 'dashboard#ad_landing_page'
  get 'image_slider', to: 'dashboard#image_slider'

  # Mock routes
  get '/home_page/_hero_stories/listing_order.json.txt', to: 'dashboard#mock_success'

  # Cascade-patterned controller actions in content_types folder
  scope module: 'content_types' do
    get '/modular/spike', to: 'modular#spike'
    get '/modular/ad_landing', to: 'modular#ad_landing'
    get '/modular/one_column_business_graduate', to: 'modular#one_column_business_graduate'
    get '/modular/one_column', to: 'modular#one_column'
    get '/modular/one_column_business_graduate', to: 'modular#one_column_business_graduate'
    get '/modular/subbrand_default', to: 'modular#one_column_subbrand'
    get '/modular/subbrand_business', to: 'modular#one_column_subbrand_business'
    get '/modular/subbrand_grad_business', to: 'modular#one_column_subbrand_grad_business'
    get '/modular/subbrand_fowler_law', to: 'modular#one_column_subbrand_fowler_law'
    get '/modular/image_slider', to: 'modular#one_column_image_slider'
    get '/modular/image_slider_business', to: 'modular#one_column_business_image_slider'
    get '/modular/image_slider_law', to: 'modular#one_column_law_image_slider'
    get '/modular/subbrand', to: 'modular#one_column_subbrand'
    get '/modular/subbrand/law', to: 'modular#one_column_subbrand_law'

    get '/modular/two_column', to: 'modular#two_column'
    get '/modular/three_column', to: 'modular#three_column'
    get '/modular/three_column_business', to: 'modular#three_column_business'

    # Next 2 point to the same action
    get '/school_home_pages/slideshow', to: 'school_home_pages#slideshow'
    get '/cascade/law', to: 'school_home_pages#slideshow'
  end

  # Omninav Controller
  get 'omninav', to: 'omninav#demo'
  get 'omninav_v2(/:template)(/:theme)', to: 'omninav#demo_v2'

  # Simplify Controller - Cascade Assets is out of control
  get 'image_slider', to: 'simplify#image_slider'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
