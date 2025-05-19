
import { supabase } from './client';

export const setupPaintColorsStorage = async () => {
  try {
    // Check if the bucket already exists
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    const bucketExists = existingBuckets?.some(bucket => bucket.name === 'paint_colors');
    
    if (!bucketExists) {
      // Create the bucket for paint colors swatches
      const { error } = await supabase.storage.createBucket('paint_colors', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg']
      });
      
      if (error) {
        console.error('Error creating paint_colors storage bucket:', error);
      } else {
        console.log('Created paint_colors storage bucket');
      }
    }
  } catch (error) {
    console.error('Error setting up paint_colors storage:', error);
  }
};
